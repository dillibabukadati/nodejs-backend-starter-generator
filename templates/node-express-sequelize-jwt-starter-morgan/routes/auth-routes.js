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
 *        - login and registration
 *      summary: API used to login the user. Once user is successfully loggedin,
 *               an accessToken along with user other details will be returned.
 *               The access token will be used in the Bearer Authtoken
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: Model
 *            description: Request Body
 *            in: body
 *            required: true
 *            schema:
 *                 $ref: '#/definitions/LoginRequest'
 *
 *      responses:
 *          200:
 *              description: returns user object with accessToken
 *              schema:
 *                 $ref: '#/definitions/LoginResponse'
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
 *        - login and registration
 *      summary: API used to register a user. Once user is successfully registered,
 *               an accessToken along with user other details will be returned.
 *               The access token will be used in the Bearer Authtoken
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: Model
 *            description: Request Body
 *            in: body
 *            required: true
 *            schema:
 *                 $ref: '#/definitions/RegisterRequest'
 *
 *      responses:
 *          200:
 *              description: returns user object with accessToken
 *              schema:
 *                 $ref: '#/definitions/LoginResponse'
 *
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
