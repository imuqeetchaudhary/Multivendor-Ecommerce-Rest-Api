const getMessage = require("../utils/message");

module.exports = (addHistory) => {
  return (io, socket) => {
    return async (msg) => {
      const roomId = Array.from(socket.rooms)[1];
      console.log("user", socket.request.user._id);
      const message = getMessage(socket.request.user._id, msg);

      console.log("room id", roomId);
      console.log("connected clients: ", io.sockets.adapter.rooms[roomId]);
      console.log(socket.rooms);
      // console.log(io.sockets.in(roomId).connected);

      // await addHistory(roomId, { ...message });
      io.to(roomId).emit("message-from-server", message);
    };
  };
};
