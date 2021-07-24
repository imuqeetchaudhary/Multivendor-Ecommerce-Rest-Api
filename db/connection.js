const mongoose = require("mongoose");

const DEV_MONGO_URI = "mongodb://localhost:27017/ecommerece-app";
const PROD_MONGO_URI = "paste-your-production-ready-mongo-uri";

const MONGO_URI =
  process.env.NODE_ENV === "production" ? PROD_MONGO_URI : DEV_MONGO_URI;

exports.connection = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
