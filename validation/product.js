const yup = require("yup")

exports.addProductSchema = yup.object({
    companyName: yup.string().required(),
    productTitle: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    address: yup.string().required(),
    state: yup.string().required(),
    isAvailable: yup.boolean().required(),
    availableDate: yup.date().required(),
})

exports.getProductSchema = yup.object({
    productId: yup.string().required(),
})