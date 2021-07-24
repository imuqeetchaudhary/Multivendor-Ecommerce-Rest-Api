const express = require("express");
const router = express.Router();
const product = require("../controllers/product");
const { authentication } = require("../middlewares/isAuth");
const { validation } = require("../middlewares/validation");
const {
  addProductSchema,
  getProductSchema,
  searchProductSchema,
} = require("../validation/product");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/",
  filename: (req, file, fileName) => {
    return fileName(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

router.get("/user-get-all", authentication, product.getAllProductForUser);
router.get("/admin-get-all", authentication, product.getAllProductForAdmin);
router.post("/search", validation(searchProductSchema), product.searchProduct);
router.post(
  "/update",
  authentication,
  validation(getProductSchema),
  product.updateProduct
);
router.post(
  "/get-single",
  authentication,
  validation(getProductSchema),
  product.getProduct
);
router.post(
  "/add",
  authentication,
  validation(addProductSchema),
  upload.single("image"),
  product.addProduct
);

module.exports = router;
