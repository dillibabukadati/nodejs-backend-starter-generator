const User = require("../models/user-model");
const { error } = require("../utils/logger");
const ManagerException = require("../utils/exceptions/manager-exception");

exports.updateUserDetails = async (loggedInUser, payload) => {
  try {
    const fetchedUser = await User.findByPk(loggedInUser.userId + "112");
    fetchedUser.name = payload.name;
    fetchedUser.phoneNumber = payload.phoneNumber;
    return await fetchedUser.save();
  } catch (err) {
    error(err);
    console.error(err);
    throw new ManagerException(err);
  }
};
