const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

/**
 * @swagger
 *  definitions:
 *      UpdateUserDetailsRequest:
 *          properties: 
 *              name: 
 *                  type: string
 *              phoneNumber: 
 *                  type: string
 * 
 */




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
 *          - in: query
 *            name: userId
 *            description: userId of the user details to fetch which will be used only by the ADMIN role user.
 *            required: false
 *            schema:
 *                 type: string
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


/**
 * @swagger
 * /user/update:
 *    put:
 *      tags:
 *        - User Management
 *      summary: API used to get updated the loggedIn user.
 *      produces:
 *          - application/json 
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            description: accessToken from login API.
 *            required: false
 *            type: Bearer accessToken
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/UpdateUserDetailsRequest'
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
router.put("/user/update",userController.updateUserDetails)

module.exports = router;
