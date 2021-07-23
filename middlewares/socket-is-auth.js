const jwt = require("jsonwebtoken");

module.exports = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    next(throwError("Token not provided"));
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    socket.request.user = decoded;

    next();
  } catch (_) {
    next(throwError("Invalid token"));
  }
};

function throwError(message) {
  return new Error(message, { statusCode: 400 });
}
