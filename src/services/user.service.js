const User = require("../models/user.model");

async function create(user) {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
}

async function get(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error("Error getting user");
  }
}

module.exports = {
  create,
  get,
};
