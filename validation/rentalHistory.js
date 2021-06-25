const yup = require("yup")

exports.addRentalSchema = yup.object({
    renterId: yup.string().required(),
    vendorId: yup.string().required(),
    productId: yup.string().required(),
    totalDays: yup.number().required(),
    rentingDate: yup.date().required(),
    returningDate: yup.date().required()
})