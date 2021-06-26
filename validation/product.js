const yup = require("yup")

exports.addProductSchema = yup.object({
    companyName: yup.string(),
    productTitle: yup.string(),
    description: yup.string(),
    price: yup.number(),
    address: yup.string(),
    state: yup.string(),
    isAvailable: yup.boolean(),
    availableDate: yup.date(),
})

exports.getProductSchema = yup.object({
    productId: yup.string().required(),
})

exports.searchProductSchema = yup.object({
    companyName: yup.string(),
    address: yup.string(),
    state: yup.string(),
    pricePerDay: yup.number(),
    pricePerDay: yup.number(),
    availableDate: yup.date(),
    availableDate: yup.date(),
})