const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { connection } = require("./db/connection");

const user = require("./routes/user");
const product = require("./routes/product");
const rentalHistory = require("./routes/rentalHistory");
const productReview = require("./routes/productReview");

const app = express();

app.use(express.static(__dirname + "/upload"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + "/upload/images"))

app.get("/", async (req, res) => {
  res.json({ message: "Multivendor E-commerce Rest Api" });
});

app.use("/user", user);
app.use("/product", product);
app.use("/rental-history", rentalHistory);
app.use("/product-review", productReview);

module.exports = { app };
