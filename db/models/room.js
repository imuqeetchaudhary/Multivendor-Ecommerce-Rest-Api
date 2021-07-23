const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  opposedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chat: [
    {
      time: String,
      message: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

const Room = mongoose.model("Room", schema);
module.exports = Room;
