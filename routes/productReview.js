const express = require("express")
const router = express.Router()
const productReview = require("../controllers/productReview")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addReviewSchema, getReviewSchema } = require("../validation/productReview")

router.post("/add", authentication, validation(addReviewSchema), productReview.addReview)
router.post("/get", validation(getReviewSchema), productReview.getReview)

module.exports = router