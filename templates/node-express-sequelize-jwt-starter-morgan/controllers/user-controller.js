const { isAdmin } = require("../utils/auth-validation");
const User = require("../models/user-model");
const ManagerException = require("../utils/exceptions/manager-exception");
const userManager = require("../manager/user-manager");
const { logger, error } = require("../utils/logger");

exports.getUserDetails = async (req, res) => {
  const userId = req.query.userId;
  let loggedInUser = req.loggedInUser;
  console.log(isAdmin(loggedInUser));
  if (userId && isAdmin(loggedInUser)) {
    const fetchedUser = await User.findByPk(userId);
    if (!fetchedUser) {
      return res.status(400).send({ status: 400, message: "User not found" });
    }
    loggedInUser = fetchedUser;
  }
  res.send({
    status: 200,
    message: "User details loaded successfully.",
    user: loggedInUser,
  });
};

exports.updateUserDetails = async (req, res) => {
  try {
    logger.info("Updating user details");
    const updatedUserDetails = await userManager.updateUserDetails(
      req.loggedInUser,
      req.body
    );
    logger.info("Updated user details successfully.");
    return res.send({
      status: 200,
      message: "User Details updated successfully.",
      user: updatedUserDetails,
    });
  } catch (err) {
    error(req, err);
    if (err instanceof ManagerException) {
      res.status(500);
    } else {
      res.status(400);
    }
    return res.send({
      status: res.status,
      message: "Failed to update user details",
      devMessage: err.message,
    });
  }
};
