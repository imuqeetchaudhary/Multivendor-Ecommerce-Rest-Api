const { Room } = require("../db/models/room")

exports.allRooms = async (socket, cb) => {
    const userId = socket.request.user._id
    // console.log("UserId:", userId)

    const rooms = await Room.find(
        {
            $or: [
                { userId: userId },
                { opposedUserId: userId }
            ]
        }
    ).populate("userId").populate("opposedUserId")
    if (!rooms) return socket.emit("exception", "Room not found");
    // console.log("All Rooms:", rooms)

    const allRooms = { allROoms: rooms }
    // console.log("All Rooms:", allRooms)

    cb(allRooms)
}