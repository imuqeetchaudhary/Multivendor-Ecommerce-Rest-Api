exports.validation = (schema) => async (req, res, next) => {
    const body = req.body
    try {
        await schema.validate(body, { abortEarly: false })
        next()
    }
    catch (err) {
        res.status(422).json({
            message: err.errors
        })
    }
}