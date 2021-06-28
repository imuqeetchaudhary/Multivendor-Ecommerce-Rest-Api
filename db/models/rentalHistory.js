const mongoose = require("mongoose")
const schema = mongoose.Schema

const rentalHistorySchema = new schema({
    renterId: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    vendorId: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: schema.Types.ObjectId,
        ref: "Product"
    },
    shippingState: {
        type: String,
        require: true
    },
    rentingDate: {
        type: Date,
        require: true
    },
    returningDate: {
        type: Date,
        require: true
    },
    totalDays: {
        type: Number,
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    },
})

exports.RentalHistory = mongoose.model("RentalHistory", rentalHistorySchema)