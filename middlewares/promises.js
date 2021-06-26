const Exceptions = require("../utils/custom-exceptions");

exports.promise = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (err) {
            let errors = [];
            let message = "Server Error";
            let statusCode = 500;
            let name = "Server Error";

            if (err instanceof Exceptions.HttpError) {
                if (err instanceof Exceptions.ValidationError) {
                    errors = err.errors;
                }

                message = err.message;
                statusCode = err.statusCode;
                name = err.name;
            }

            res.status(statusCode).send({ message, error: err.message });
        }
    };
};
