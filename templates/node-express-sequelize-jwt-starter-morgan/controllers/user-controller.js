const { isAdmin } = require("../utils/auth-validation");
const User = require("../models/user-model");

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
