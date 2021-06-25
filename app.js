const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const { connection } = require("./db/connection")

const user = require("./routes/user")
const product = require("./routes/product")
const rentalHistory = require("./routes/rentalHistory")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get("/", async (req, res) => {
    res.json({ message: "Multivendor E-commerce Rest Api" })
})

app.use("/user", user)
app.use("/product", product)
app.use("/rental-history", rentalHistory)

module.exports = { app }