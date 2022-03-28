const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");



/**
 * @swagger
 * /user:
 *    get:
 *      tags:
 *        - User Management
 *      summary: API used to get loggedIn user details. Or get user details by userId passed in the query parameter which is applicable only for ADMIN user role, users.
 *      produces:
 *          - application/json 
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            description: accessToken from login API.
 *            required: false
 *            type: Bearer accessToken
 *            
 *      responses:
 *          200:
 *              description: return success response with user object.
 *              content:
 *                  'application/json':
 *                     schema:
 *                        $ref: '#/definitions/LoginResponse'
 *          400:
 *              description: returns Error Response with comma separated message if there are multiple errors.
 *              content:
 *                  'application/json':
 *                     schema:
 *                        $ref: '#/definitions/ErrorResponse'
 */
router.get("/user", userController.getUserDetails);

module.exports = router;
