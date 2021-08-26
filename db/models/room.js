const mongoose = require("mongoose")
const schema = mongoose.Schema

const roomSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  opposedUserId: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  chat: [
    {
      message: String,
      userId: {
        type: schema.Types.ObjectId,
        ref: "User"
      },
    },
  ]
})

exports.Room = mongoose.model("Room", roomSchema)