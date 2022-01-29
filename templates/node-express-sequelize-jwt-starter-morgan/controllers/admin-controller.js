const { logger, error } = require('../utils/logger')
const User = require('../models/user-model')

exports.allUsers = async (req, res) => {
    let size = +req.query.size || 20;
    let page = req.query.page ? (+req.query.page * +size) : 0;
    const users = await User.findAll({ limit: +size, offset: +page })
    res.send({ status: 200, message: 'Fetched all users', 'users': users });
}