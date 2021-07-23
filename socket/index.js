const { io } = require("../server");

io.on("connect", (socket) => {
  socket.emit("msg-from-server", "Hello from server");
});

module.exports = io;
