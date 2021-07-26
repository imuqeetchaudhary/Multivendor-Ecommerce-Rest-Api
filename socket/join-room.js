module.exports = (getSingleRoom, getSingleUser) => {
  return (socket) => {
    return async (roomId) => {
      const room = await getSingleRoom(roomId);
      const existingRoom = Array.from(socket.rooms)[1];

      if (room) {
        const opposedUser = await getSingleUser(room.opposedUser);
        const currentUser = socket.request.user;

        const chatObj = {
          [currentUser._id]: currentUser,
          [room.opposedUser]: opposedUser,
          chat: room.chat,
        };

        socket.leave(existingRoom);
        socket.join(roomId);
        socket.emit("chat-history", chatObj);
      } else {
        socket.emit("join-room-error", "Room is not found");
      }
    };
  };
};
