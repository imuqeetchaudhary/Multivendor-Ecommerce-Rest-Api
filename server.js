const { app } = require("./app");
const socketio = require("socket.io");

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Sever started at http://localhost:${PORT}`);
});

const io = socketio(server, {
  cors: { origin: "*" },
});

module.exports = { io, app };
