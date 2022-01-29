const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

/**
 * @swagger
 * /user:
 *    get:
 *      tags:
 *        - User Management
 *      summary: API used to get loggedIn user details. Or get user details by userId passed in the
 *              query parameter which is applicable only for ADMIN user role, users.
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: Authorization
 *            description: accessToken from login API.
 *            required: false
 *            type: Bearer accessToken
 *
 *      responses:
 *          200:
 *              description: returns user object
 *              schema:
 *                 $ref: '#/definitions/LoginResponse'
 *
 */
router.get("/user", userController.getUserDetails);

module.exports = router;
