const { app } = require("./app");
const socketio = require("socket.io");
const isAuthMiddleware = require("./middlewares/socketIsAuth");

const { allRooms } = require("./socket/allRooms")
const { createRoom } = require("./socket/createRoom")
const { chatHistory } = require("./socket/chatHistory")
const { msgFromClient } = require("./socket/msgFromClientAndServer")

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
    allRooms(socket, cb)
  })

  socket.on("chat-history", (data, cb) => {
    chatHistory(data, cb)
  })

  socket.on("msg-from-client", async (data) => {
    msgFromClient(io, socket, data)
  })

})

module.exports = { io, app };
