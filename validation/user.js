const yup = require("yup")

exports.registerSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(5).max(10)
})

exports.loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})