const { Product } = require("../db/models/product")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.getProduct = promise(async (req, res) => {
    const product = await Product.findOne({ _id: req.body.productId })
    if (!product) throw new Exceptions.NotFound

    res.status(200).json({ product })
})

exports.getAllProductForAdmin = promise(async (req, res) => {
    const product = await Product.find()
    if (!product) throw new Exceptions.NotFound

    res.status(200).json({ product })
})

exports.getAllProductForUser = promise(async (req, res) => {
    const product = await Product.find({ userId: req.user._id })
    if (!product) throw new Exceptions.NotFound

    res.status(200).json({ product })
})

exports.addProduct = promise(async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body))

    const newProduct = new Product({
        ...body,
        userId: req.user._id,
        image: req.file.filename
    })
    await newProduct.save()
    res.status(200).json({ message: "Successfully added new product" })
})

exports.updateProduct = promise(async (req, res) => {
    const body = req.body
    const updatedProduct = await Product.updateOne(
        {
            _id: body.productId
        },
        {
            $set: {
                ...body
            }
        }
    )
    res.status(200).json({
        message: "Successfully updated product",
    })
})