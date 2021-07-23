module.exports = (getAllRooms) => {
  return (socket) => {
    return async (cb) => {
      const rooms = await getAllRooms(socket.request.user._id);

      cb(rooms);
    };
  };
};
