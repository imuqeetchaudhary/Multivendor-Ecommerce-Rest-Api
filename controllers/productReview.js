const { ProductReview } = require("../db/models/productReview")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addReview = promise(async (req, res) => {
    const body = req.body

    const review = await ProductReview.findOne({ renterId: req.user._id, productId: body.productId })
    if (review) throw new Exceptions.BadRequset("You've already reviewd for this product")

    const newReview = new ProductReview({
        renterId: req.user._id,
        ...req.body
    })
    await newReview.save()
    res.status(200).json({ message: "Successfully added review" })
})

exports.getReview = promise(async (req, res) => {
    const body = req.body

    const getReview = await ProductReview.find({ productId: body.productId })
    if (!getReview) throw new Exceptions.NotFound("No review found")

    res.status(200).json({ reviews: getReview })
})