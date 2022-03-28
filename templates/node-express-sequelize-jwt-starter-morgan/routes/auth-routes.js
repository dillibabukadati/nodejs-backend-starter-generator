const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { body } = require("express-validator");
const { checkForErrors } = require("../utils/validation-errors-checker");

/**
 * @swagger
 * definitions:
 *   LoginResponse:
 *     properties:
 *       status:
 *          type: integer
 *       message:
 *          type: string
 *       user:
 *          type: object
 *          properties:
 *            userId:
 *              type: string
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            updatedAt:
 *              type: string
 *            createdAt:
 *              type: string
 *            lastLogin:
 *              type: string
 *            accessToken:
 *              type: string
 *            userRoles:
 *              type: string
 * 
 *   ErrorResponse:
 *     properties: 
 *      status: 
 *        type: integer
 *      message: 
 *        type: string
 */

/**
 * @swagger
 * definitions:
 *   RegisterRequest:
 *     properties:
 *       name:
 *          type: string
 *       email:
 *          type: string
 *       password:
 *          type: string
 *       phoneNumber:
 *          type: string
 */

/**
 * @swagger
 * definitions:
 *   LoginRequest:
 *     properties:
 *       email:
 *          type: string
 *       password:
 *          type: string
 */

/**
 * @swagger
 * /login:
 *    post:
 *      tags:
 *        - Login and Registration
 *      summary: API used to login the user. Once user is successfully loggedin,
 *               an accessToken along with user other details will be returned.
 *               The access token will be used in the Bearer Authtoken
 *      produces:
 *          - application/json
*      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/LoginRequest'
 *
 *      responses:
 *          200:
 *              description: returns Base response
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
 *
 */
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").not().isEmpty().trim().escape(),
    checkForErrors,
  ],
  authController.login
);


/**
 * @swagger
 * /register:
 *    post:
 *      tags:
 *        - Login and Registration
 *      summary: API used to register a user. Once user is successfully registered,
 *               an accessToken along with user other details will be returned.
 *               The access token will be used in the Bearer Authtoken
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/RegisterRequest'
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
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").not().isEmpty().trim().escape(),
    body("name").not().isEmpty().trim().escape(),
    checkForErrors,
  ],
  authController.register
);

module.exports = router;
