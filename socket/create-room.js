module.exports = (createRoom) => {
  return (socket) => {
    return async (arg, cb) => {
      const username = socket.request.user._id;
      const opposedUsername = arg.user;

      try {
        const newRoom = await createRoom(username, opposedUsername);
        console.log("newly created room", newRoom);

        if (cb) {
          cb(newRoom);
        }
        // return newRoom;
      } catch (err) {
        socket.emit("exception", err.message);
      }
    };
  };
};
