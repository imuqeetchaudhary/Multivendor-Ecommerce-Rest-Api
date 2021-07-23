const mongoose = require("mongoose")

exports.connection = mongoose.connect("mongodb://localhost:27017/ecommerece-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})