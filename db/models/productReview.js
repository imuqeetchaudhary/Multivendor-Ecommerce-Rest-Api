const mongoose = require("mongoose")
const schema = mongoose.Schema

const productReviewSchema = new schema({
    renterId: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: schema.Types.ObjectId,
        ref: "Product"
    },
    review: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
})

exports.ProductReview = mongoose.model("ProductReview", productReviewSchema)