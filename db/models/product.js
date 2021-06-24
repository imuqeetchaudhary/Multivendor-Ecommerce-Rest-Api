const mongoose = require("mongoose")
const schema = mongoose.Schema

const productSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    companyName: {
        type: String,
        require: true
    },
    productTitle: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    pricePerDay: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    isAvailable: {
        type: Boolean,
        require: true
    },
    availableDate: {
        type: Date,
    }
})

exports.Product = mongoose.model("Product", productSchema)