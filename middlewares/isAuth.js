const env = require("dotenv").config()
const jwt = require("jsonwebtoken")
const Exceptions = require("../utils/custom-exceptions")

exports.authentication = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (token === null) throw new Exceptions.NotFound

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) throw new Exceptions.AccessDenied

            else {
                req.user = user
                next()
            }
        })
    }
    catch (err) {
        res.status(401).json({ message: "Auth Failed! Invalid Token" })
    }

}