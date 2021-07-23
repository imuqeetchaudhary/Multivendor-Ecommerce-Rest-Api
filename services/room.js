const Room = require("../db/models/room");
const roomSerializer = require("../utils/mongo-serializer");

async function getAllRooms(user) {
  const allRooms = await Room.find({ $or: [{ user }, { opposedUser: user }] });

  return allRooms.map((room) => roomSerializer(room._doc));
}

async function createRoom(user, opposedUser) {
  const existingRoom = await Room.findOne({ user, opposedUser }).exec();

  if (existingRoom) {
    return { success: false, message: "Room is already exist" };
  }

  const newRoom = new Room({ user, opposedUser });
  await newRoom.save();
  return roomSerializer(newRoom._doc);
}

async function getSingleRoom(roomId) {
  const room = await Room.findById(roomId).exec();

  return roomSerializer(room._doc);
}

async function addHistory(roomId, messageDetail) {
  const existingRoom = await Room.findByIdAndUpdate(roomId, {
    $push: { chat: messageDetail },
  });

  console.log(existingRoom);

  return roomSerializer(existingRoom._doc);
}

module.exports = { createRoom, getAllRooms, getSingleRoom, addHistory };
