const { Room } = require("../db/models/room")
const { User } = require("../db/models/user")

exports.createRoom = async (socket, data, cb) => {
    if (!socket.request.user._id) return socket.emit("exception", "Token required!");
    const userId = socket.request.user._id

    if (!data.opposedUserId) return socket.emit("exception", "opposedUserId is required");
    const opposedUserId = data.opposedUserId

    const roomExists = await Room.findOne({ userId, opposedUserId })
    if (roomExists) return socket.emit("exception", "Room already exists");

    const newRoom = new Room({
        userId: userId,
        opposedUserId: opposedUserId,
    })
    newRoom.save()
    console.log("New Room:", newRoom)
    cb("Newly room created")
}