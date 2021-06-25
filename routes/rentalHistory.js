const express = require("express")
const router = express.Router()
const rentalHistory = require("../controllers/rentalHistory")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addRentalSchema } = require("../validation/rentalHistory")

router.get("/renter-get", authentication, rentalHistory.getRentalHistoryForRenter)
router.get("/vendor-get", authentication, rentalHistory.getRentalHistoryForVendor)
router.get("/admin-get", authentication, rentalHistory.getRentalHistoryForAdmin)
router.post("/add", authentication, validation(addRentalSchema), rentalHistory.addRental)

module.exports = router