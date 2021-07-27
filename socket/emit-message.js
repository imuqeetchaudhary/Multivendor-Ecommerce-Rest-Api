const getMessage = require("../utils/message");

module.exports = (addHistory) => {
  return (io, socket) => {
    return async ({ msg, roomId }) => {
      const existingRoom = Array.from(socket.rooms)[1];
      const message = getMessage(socket.request.user._id, msg);

      socket.leave(existingRoom);
      socket.join(roomId);

      await addHistory(roomId, { ...message });
      io.to(roomId).emit("message-from-server", message);
    };
  };
};
