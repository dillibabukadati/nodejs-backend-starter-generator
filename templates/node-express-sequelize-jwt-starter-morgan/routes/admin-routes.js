const express = require('express');
const router = express.Router();
const { methodNotAllowed } = require('../utils/route-validation')
const adminController = require('../controllers/admin-controller')
router.route('/users').get(adminController.allUsers).all(methodNotAllowed)

module.exports = router;