const express = require("express")
const router = express.Router()
const user = require("../controllers/user")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { registerSchema, loginSchema } = require("../validation/user")

router.get("/profile", authentication, user.profile)
router.post("/register", validation(registerSchema), user.register)
router.post("/login", validation(loginSchema), user.login)

module.exports = router