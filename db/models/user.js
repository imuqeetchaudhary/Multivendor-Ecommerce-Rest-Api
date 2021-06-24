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
    }
})

exports.User = mongoose.model("User", userSchema)