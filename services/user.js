const { User } = require("../db/models/user");

async function getSingleUser(id) {
  return await User.findById(id).select("name email isAdmin");
}

module.exports = { getSingleUser };
