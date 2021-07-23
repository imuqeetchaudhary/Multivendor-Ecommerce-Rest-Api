const { io } = require("../server");
const roomService = require("../services/room");
const isAuthMiddleware = require("../middlewares/socket-is-auth");

const createRoom = require("./create-room")(roomService.createRoom);
const getAllRooms = require("./all-rooms")(roomService.getAllRooms);
const joinRoom = require("./join-room")(roomService.getSingleRoom);

io.use(isAuthMiddleware);
io.on("connect", (socket) => {
  socket.emit("msg-from-server", "Hello from server");

  socket.on("create-room", createRoom(socket));
  socket.on("all-rooms", getAllRooms(socket));
  socket.on("join-room", joinRoom(socket));
});

module.exports = io;
