const User = require("../models/user-model");
const UserRoles = require("../models/user-roles");

function containingAnyCommonRole(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item));
}

/**
 * Validation autorization
 * @param {*} rolesAllowed optional
 * @returns
 */
exports.validateAuthorization = (rolesAllowed = undefined) => {
  return (req, res, next) => {
    const headers = req.headers;
    if (!headers.authorization) {
      res
        .status(403)
        .send({ status: 403, message: "Autharization not provided." });
      return;
    }
    let authToken = headers.authorization;
    if (String(authToken).includes("Bearer ")) {
      authToken = headers.authorization.split("Bearer ")[1];
    }
    User.findOne({ where: { accessToken: authToken }, include: UserRoles })
      .then((fetchedUser) => {
        if (!fetchedUser) {
          return res.status(401).send({ status: 401, message: "Invalid Authorization." });
        }
        const currentUserRoles = fetchedUser.user_roles.map(
          (role) => role.roleName
        );
        if (
          rolesAllowed &&
          !containingAnyCommonRole(rolesAllowed.split(","), currentUserRoles)
        ) {
          res
            .status(401)
            .send({ status: 401, message: "Invalid Authorization." });
          return;
        }
        req.loggedInUser = fetchedUser;
        next();
      })
      .catch((error) => {
        console.error(error);
        res
          .status(401)
          .send({ status: 401, message: "Invalid Authorization." });
        return;
      });
  };
};

exports.isAdmin = (user) => {
  const currentUserRoles = user.user_roles.map((role) => role.roleName);
  return containingAnyCommonRole(["ADMIN"], currentUserRoles);
};
