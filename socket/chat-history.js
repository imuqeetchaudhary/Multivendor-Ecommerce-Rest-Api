module.exports = (getSingleRoom, getSingleUser) => {
  return (socket) => {
    return async (roomId, cb) => {
      const room = await getSingleRoom(roomId);

      if (room) {
        const opposedUser = await getSingleUser(room.opposedUser);
        const currentUser = socket.request.user;

        const chatObj = {
          [currentUser._id]: currentUser,
          [room.opposedUser]: opposedUser,
          chat: room.chat,
        };

        cb(chatObj);
      } else {
        socket.emit("join-room-error", "Room is not found");
      }
    };
  };
};
