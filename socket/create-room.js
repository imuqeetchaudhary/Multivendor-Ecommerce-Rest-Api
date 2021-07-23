module.exports = (createRoom) => {
  return (socket) => {
    return async (arg, cb) => {
      const username = socket.handshake.auth.username;
      const opposedUsername = arg.username;

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
