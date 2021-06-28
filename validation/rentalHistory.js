const yup = require("yup")

exports.addRentalSchema = yup.object({
    productId: yup.string().required(),
    totalDays: yup.number().required(),
    rentingDate: yup.date().required(),
    returningDate: yup.date().required(),
    shippingState: yup.string().required(),
    shippingAddress: yup.string().required()
})