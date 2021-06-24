const mongoose = require("mongoose")
const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        default: 0
    }
})

exports.User = mongoose.model("User", userSchema)