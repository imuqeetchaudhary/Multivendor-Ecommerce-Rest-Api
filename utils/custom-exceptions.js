class HttpError extends Error {
    statusCode;

    constructor(message, code, name) {
        super(message);
        this.name = name;
        this.statusCode = code || 500;
    }
}

class EmailExist extends HttpError {
    constructor(message = "Email Already Exists") {
        super(message, 400);
    }
}

class EmailNotExists extends HttpError {
    constructor(message = "Email Not Found") {
        super(message, 400);
    }
}

class NotFound extends HttpError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

class CredentialsNotMatched extends HttpError {
    constructor(message = "Your Credentials not matched") {
        super(message, 400);
    }
}

class ValidationError extends HttpError {
    errors;

    constructor(message, errors = []) {
        super(message, 422, "Validation Error");
        this.errors = errors;
    }
}

class AccessDenied extends HttpError {
    constructor(message = "Access Denied") {
        super(message, 401);
    }
}

class LoginFailed extends AccessDenied {
    constructor(message = "Login Failed") {
        super(message);
    }
}

class BadRequset extends HttpError {
    constructor(message = "Bad Requset") {
        super(message, 400);
    }
}

class EmailExpire extends HttpError {
    constructor(message = "Email Expire") {
        super(message, 406);
    }
}

class InvalidParamID extends BadRequset {
    constructor(message = "Invalid Param id") {
        super(message);
    }
}

module.exports = {
    HttpError,
    EmailExist,
    CredentialsNotMatched,
    ValidationError,
    NotFound,
    AccessDenied,
    LoginFailed,
    EmailNotExists,
    BadRequset,
    EmailExpire,
    InvalidParamID,
};
