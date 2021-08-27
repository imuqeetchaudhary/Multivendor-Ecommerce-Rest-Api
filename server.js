const { app } = require("./app");
const socketio = require("socket.io");

const isAuthMiddleware = require("./middlewares/socketIsAuth");
const { Room } = require("./db/models/room")
const { User } = require("./db/models/user")

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

    if (!socket.request.user._id) return socket.emit("exception", "Token required!");
    const userId = socket.request.user._id

    if (!data.userId) return socket.emit("exception", "userId is required");
    const opposedUserId = data.userId

    const roomExists = await Room.findOne({ userId, opposedUserId })
    if (roomExists) return socket.emit("exception", "Room already exists");

    const newRoom = new Room({
      userId: userId,
      opposedUserId: opposedUserId,
    })
    newRoom.save()
    cb("Newly room created")

  })

  socket.on("all-rooms", async (cb) => {
    const userId = socket.request.user._id
    // console.log("UserId:", userId)

    const rooms = await Room.find({ userId }).populate("userId").populate("opposedUserId")
    if (!rooms) return socket.emit("exception", "Room not found");
    // console.log("All Rooms:", rooms)

    const allRooms = { allROoms: rooms }
    // console.log("All Rooms:", allRooms)

    cb(allRooms)
  })

  socket.on("chat-history", async (data, cb) => {

    if (!data.roomId) return socket.emit("exception", "roomId is required");
    const roomId = data.roomId
    // console.log("RoomId:", roomId)

    const room = await Room.findById(roomId)
    if (!room) return socket.emit("exception", "Room not found");

    // console.log("UserId:", room.userId)
    const user = await User.findById(room.userId).select("name")
    // console.log("User", user)

    // console.log("OpposedUserId:", room.opposedUserId)
    const opposedUser = await User.findById(room.opposedUserId).select("name")
    // console.log("OpposedUser", opposedUser)

    const chatObj = {
      [user._id]: user,
      [opposedUser._id]: opposedUser,
      chatHistory: room.chat
    }

    // console.log("Chat History:", chatObj)
    cb(chatObj)

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
