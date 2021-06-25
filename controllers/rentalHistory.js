const { RentalHistory } = require("../db/models/rentalHistory")
const { Product } = require("../db/models/product")
const { User } = require("../db/models/user")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

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

    // to find product to be rented
    const product = await Product.findOne({ _id: body.productId })
    if (!product) throw new Exceptions.NotFound()

    // to find renter balance to check either balance is > than product price or not
    const renter = await User.findOne({ _id: body.renterId })
    if (!renter) throw new Exceptions.NotFound()

    // to find vendor to update his balance
    const vendor = await User.findOne({ _id: body.vendorId })
    if (!vendor) throw new Exceptions.NotFound()

    const totalPrice = body.totalDays * product.pricePerDay

    if (product.isAvailable == true) {
        if (renter.balance > totalPrice) {

            const newRental = new RentalHistory({
                ...req.body,
                totalPrice: totalPrice
            })

            const updateRenter = await User.updateOne(
                { _id: body.renterId },
                {
                    $set: {
                        balance: renter.balance - totalPrice
                    }
                })
            console.log("Successfully updated rentar balance");

            const updateVendor = await User.updateOne(
                { _id: body.vendorId },
                {
                    $set: {
                        balance: vendor.balance + totalPrice
                    }
                })
            console.log("Successfully updated vendor balance");

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
            res.status(200).json({ message: "Successfully rented product" })
        }
        else {
            throw new Exceptions.BadRequset("You don't have enough balance")
        }
    }
    else {
        throw new Exceptions.BadRequset("Product is not available for rent")
    }

})