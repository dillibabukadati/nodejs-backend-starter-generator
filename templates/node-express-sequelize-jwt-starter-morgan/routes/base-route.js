const express = require('express');
const baseController = require('../controllers/base-controller')
const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *      description: Sample index endpoint
 *      responses:
 *          '200': 
 *              description: Hello World
 * 
 */
router.get('/', baseController.index);

module.exports = router