module.exports = (getSingleRoom, getSingleUser) => {
  return (socket) => {
    return async (roomId, cb) => {
      const room = await getSingleRoom(roomId);

      if (room) {
        const currentUser = socket.request.user;
        const opposedUserID = getOpposedUserID(currentUser._id, room);
        const opposedUser = await getSingleUser(opposedUserID);

        const chatObj = {
          [currentUser._id]: currentUser,
          [opposedUserID]: opposedUser,
          chat: room.chat,
        };

        cb(chatObj);
      } else {
        socket.emit("join-room-error", "Room is not found");
      }
    };
  };
};

function getOpposedUserID(currentUserId, room) {
  if (currentUserId === room.user) {
    return room.opposedUser;
  } else {
    return room.user;
  }
}