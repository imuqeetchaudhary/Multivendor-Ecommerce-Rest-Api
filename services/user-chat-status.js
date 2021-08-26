// const rooms = {};

// function addUserToRoom(roomId, userId) {
//   let userStatus = rooms[roomId];

//   if (!userStatus) {
//     userStatus = {
//       [userId]: true,
//     };
//   }

//   rooms[roomId] = { ...userStatus };
// }

// function leaveUserFromRoom(roomId, userId) {
//   const userStatus = rooms[roomId];

//   if (!userStatus) return;

//   userStatus[userId] = false;
//   rooms[roomId] = { ...userStatus };
// }

// function isUserOffline(roomId, userId) {
//   const userStatus = rooms[roomId];

//   if (!userStatus) return false;

//   const userKeys = Object.keys(userStatus);
//   return userKeys[userId] || false;
// }

// module.exports = { addUserToRoom, leaveUserFromRoom, isUserOffline };
