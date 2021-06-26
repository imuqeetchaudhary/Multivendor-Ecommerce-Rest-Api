const yup = require("yup")

exports.addReviewSchema = yup.object({
    productId: yup.string().required(),
    rating: yup.number().min(1).max(5),
    review: yup.string()
})

exports.getReviewSchema = yup.object({
    productId: yup.string().required(),
})