const express = require("express")
const router = express.Router()
const product = require("../controllers/product")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addProductSchema, getProductSchema } = require("../validation/product")

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, fileName) => {
        return fileName(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
})

router.post("/get", authentication, validation(getProductSchema), product.getProduct)
router.post("/get-all", authentication, product.getAllProduct)
router.post("/add", authentication, upload.single("image"), product.addProduct)

module.exports = router