const { Room } = require("../db/models/room")
const { User } = require("../db/models/user")

exports.chatHistory = async (data, cb) => {
    if (!data.roomId) return socket.emit("exception", "roomId is required");
    const roomId = data.roomId
    // console.log("RoomId:", roomId)

    const room = await Room.findById(roomId)
    if (!room) return socket.emit("exception", "Room not found");

    // console.log("UserId:", room.userId)
    const user = await User.findById(room.userId).select("name")
    // console.log("User", user)

    // console.log("OpposedUserId:", room.opposedUserId)
    const opposedUser = await User.findById(room.opposedUserId).select("name")
    // console.log("OpposedUser", opposedUser)

    const chatObj = {
        [user._id]: user,
        [opposedUser._id]: opposedUser,
        chatHistory: room.chat
    }

    // console.log("Chat History:", chatObj)
    cb(chatObj)
}