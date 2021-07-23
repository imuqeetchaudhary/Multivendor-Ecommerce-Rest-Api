const { io } = require("../server");
const roomService = require("../services/room");
const isAuthMiddleware = require("../middlewares/socket-is-auth");

const createRoom = require("./create-room")(roomService.createRoom);

io.use(isAuthMiddleware);
io.on("connect", (socket) => {
  socket.emit("msg-from-server", "Hello from server");

  socket.on("create-room", createRoom(socket));
});

module.exports = io;
