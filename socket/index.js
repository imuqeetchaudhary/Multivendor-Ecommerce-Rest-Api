// const { io } = require("../server");
// const roomService = require("../services/room");
// const userService = require("../services/user");
// const isAuthMiddleware = require("../middlewares/socket-is-auth");

// const createRoom = require("./create-room")(roomService.createRoom);
// const getAllRooms = require("./all-rooms")(roomService.getAllRooms);
// const emitMessage = require("./emit-message")(roomService.addHistory);
// const joinRoom = require("./join-room")(
//   roomService.getSingleRoom,
//   userService.getSingleUser
// );
// const getChatHistory = require("./chat-history")(
//   roomService.getSingleRoom,
//   userService.getSingleUser
// );

// io.use(isAuthMiddleware);
// io.on("connect", (socket) => {
//   socket.emit("msg-from-server", "Hello from server");

//   socket.on("create-room", createRoom(socket));
//   socket.on("all-rooms", getAllRooms(socket));
//   socket.on("join-room", joinRoom(socket));
//   socket.on("message-from-client", emitMessage(io, socket));
//   socket.on("chat-history", getChatHistory(socket));
// });

// module.exports = io;
