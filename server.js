const { app } = require("./app");
const socketio = require("socket.io");

const isAuthMiddleware = require("./middlewares/socketIsAuth");
const { Room } = require("./db/models/room")
const { User } = require("./db/models/user")

const { chatHistory } = require("./socket/chatHistory")
const { createRoom } = require("./socket/createRoom")

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Sever started at http://localhost:${PORT}`);
});

const io = socketio(server, {
  cors: { origin: "*" },
});

io.use(isAuthMiddleware)

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit("hello-from-server", "Hello from server")

  socket.on("create-room", async (data, cb) => {
    createRoom(socket, data, cb)
  })

  socket.on("all-rooms", async (cb) => {
    const userId = socket.request.user._id
    // console.log("UserId:", userId)

    const rooms = await Room.find(
      {
        $or: [
          { userId: userId },
          { opposedUserId: userId }
        ]
      }
    ).populate("userId").populate("opposedUserId")
    if (!rooms) return socket.emit("exception", "Room not found");
    // console.log("All Rooms:", rooms)

    const allRooms = { allROoms: rooms }
    // console.log("All Rooms:", allRooms)

    cb(allRooms)
  })

  socket.on("chat-history", (data, cb) => {
    chatHistory(data, cb)
  })

  socket.on("msg-from-client", async (data) => {

    if (!data.roomId) return socket.emit("exception", "roomId is required");
    const roomId = data.roomId
    // console.log("RoomId:", roomId)

    if (!data.message) return socket.emit("exception", "message is required");
    const message = data.message
    // console.log("Message:", message)

    const room = await Room.findById(roomId)
    if (!room) return socket.emit("exception", "Room not found")

    const userId = socket.request.user._id
    // console.log("UserId:", userId)

    const opposedUserId = room.opposedUserId
    // console.log("OpposedUserId:", opposedUserId)

    const opposedUser = await User.findById(opposedUserId)
    if (!opposedUser) return socket.emit("exception", "opposedUser not found")

    await Room.updateOne(
      { _id: roomId },
      {
        $push: {
          chat: {
            userId: userId,
            message: message
          }
        }
      }
    )

    const existingRoom = Array.from(socket.rooms)[1];

    socket.leave(existingRoom)

    socket.join(roomId)

    const messageObj = {
      userId: userId,
      message: message
    }

    io.to(roomId).emit("msg-from-server", messageObj)

  })

})

module.exports = { io, app };
