const { RentalHistory } = require("../db/models/rentalHistory")
const { Product } = require("../db/models/product")
const { User } = require("../db/models/user")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")
const { sendMail } = require("../middlewares/sendMail")
const fs = require("fs")
const path = require('path');
const stripe = require('stripe')('sk_test_51J1POvClkiKKoyU1EwrqRkPchsMA2eXdwSeI7VCQiqCOzOVwqOWoWGS8qCEj1fVQA7WCx1nnoeJD3KfPJHEE0XOG00uMs4G6yS');

exports.getRentalHistoryForVendor = promise(async (req, res) => {
    const rentalHistory = await RentalHistory.find({ vendorId: req.user._id })
    if (!rentalHistory) throw new Exceptions.NotFound("No rental History Found")

    res.status(200).json({ rentalHistory })
})

exports.getRentalHistoryForRenter = promise(async (req, res) => {
    const rentalHistory = await RentalHistory.find({ renterId: req.user._id })
    if (!rentalHistory) throw new Exceptions.NotFound("No rental History Found")

    res.status(200).json({ rentalHistory })
})

exports.getRentalHistoryForAdmin = promise(async (req, res) => {
    const rentalHistory = await RentalHistory.find()
    if (!rentalHistory) throw new Exceptions.NotFound("No rental History Found")

    res.status(200).json({ rentalHistory })
})

exports.addRental = promise(async (req, res) => {
    const body = req.body

    function statesSalesTax() {
        const state = (body.shippingState).toLowerCase()
        let tax = fs.readFileSync(path.resolve("statesSalesTax.json"));
        let taxArray = JSON.parse(tax);
        const statesSalesTax = taxArray.statesSalesTax.find((tax) => {
            return tax.state == state
        })
        stateTax = statesSalesTax.tax
        return stateTax
    }

    function adminCommision(total) {
        let ammount = ((10 / 100) * total)
        return ammount
    }

    function salesTax(total) {
        let ammount = ((statesSalesTax() / 100) * total)
        return ammount
    }

    // to find product to be rented
    const product = await Product.findOne({ _id: body.productId })
    if (!product) throw new Exceptions.NotFound("Product not found")

    const renterId = req.user._id
    const vendorId = product.userId
    const adminId = "60fc49e7a1718f0004433385"

    // to find admin to update his commision later
    const admin = await User.findOne({ _id: adminId })
    if (!admin) throw new Exceptions.NotFound("Admin not found")

    // to find renter balance to check either balance is > than product price or not
    const renter = await User.findOne({ _id: renterId })
    if (!renter) throw new Exceptions.NotFound("Renter not found")

    // to find vendor to update his balance
    const vendor = await User.findOne({ _id: vendorId })
    if (!vendor) throw new Exceptions.NotFound("Vendor not found")

    const totalPrice = body.totalDays * product.pricePerDay
    const address = `The product's shipping address for ${renter.name} is ${body.shippingAddress}, ${body.shippingState}. The number of renter is ${renter.number}`
    console.log(address);

    const adminNewBalance = (2 * adminCommision(totalPrice))

    if (product.isAvailable == true) {

        const newRental = new RentalHistory({
            ...req.body,
            renterId: renterId,
            vendorId: vendorId,
            totalPrice: totalPrice
        })

        // const updateRenter = await User.updateOne(
        //     { _id: renterId },
        //     {
        //         $set: {
        //             balance: (renter.balance - totalPrice) - adminCommision(totalPrice) - salesTax(totalPrice)
        //         }
        //     })
        // console.log("Successfully updated rentar balance");

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round((totalPrice + adminCommision(totalPrice) + salesTax(totalPrice)) * 100),
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment' },
            receipt_email: renter.email

        });

        res.json({
            productName: product.productTitle,
            productDescription: product.description,
            vendorName: vendor.name,
            'client_secret': paymentIntent['client_secret'] })

        const updateVendor = await User.updateOne(
            { _id: vendorId },
            {
                $set: {
                    balance: (vendor.balance + totalPrice) - adminCommision(totalPrice) + salesTax(totalPrice)
                }
            })
        console.log("Successfully updated vendor balance");

        const updateAdmin = await User.updateOne(
            { _id: adminId },
            {
                $set: {
                    balance: admin.balance + adminNewBalance
                }
            })
        console.log("Successfully updated admin balance");

        const updateProduct = await Product.updateOne(
            { _id: body.productId },
            {
                $set: {
                    isAvailable: false,
                    availableDate: body.returningDate
                }
            }
        )
        console.log("Successfully updated product available dates");

        await newRental.save()
        await sendMail(vendor.email, address)
        console.log("Successfully rented product");
        // res.status(200).json({ message: "Successfully rented product" })
    }
    else {
        throw new Exceptions.BadRequset("Product is not available for rent")
    }


})