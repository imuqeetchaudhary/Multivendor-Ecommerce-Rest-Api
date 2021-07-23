module.exports = (getSingleRoom) => {
  return (socket) => {
    return async (roomId) => {
      const room = await getSingleRoom(roomId);
      const existingRoom = Array.from(socket.rooms)[1];

      if (room) {
        socket.leave(existingRoom);
        socket.join(roomId);
        socket.emit("chat-history", room.chat);
      } else {
        socket.emit("join-room-error", "Room is not found");
      }
    };
  };
};
