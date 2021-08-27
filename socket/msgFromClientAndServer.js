const { Room } = require("../db/models/room")
const { User } = require("../db/models/user")

exports.msgFromClient = async(io, socket, data)=> {
    if (!data.roomId) return socket.emit("exception", "roomId is required");
    const roomId = data.roomId
    // console.log("RoomId:", roomId)

    if (!data.message) return socket.emit("exception", "message is required");
    const message = data.message
    // console.log("Message:", message)

    const room = await Room.findById(roomId)
    if (!room) return socket.emit("exception", "Room not found")

    const userId = socket.request.user._id
    // console.log("UserId:", userId)

    const opposedUserId = room.opposedUserId
    // console.log("OpposedUserId:", opposedUserId)

    const opposedUser = await User.findById(opposedUserId)
    if (!opposedUser) return socket.emit("exception", "opposedUser not found")

    await Room.updateOne(
        { _id: roomId },
        {
            $push: {
                chat: {
                    userId: userId,
                    message: message
                }
            }
        }
    )

    const existingRoom = Array.from(socket.rooms)[1];

    socket.leave(existingRoom)

    socket.join(roomId)

    const messageObj = {
        userId: userId,
        message: message
    }

    io.to(roomId).emit("msg-from-server", messageObj)
}