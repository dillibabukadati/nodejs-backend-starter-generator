const { body, validationResult } = require('express-validator');

exports.checkForErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let messages = errors.array().map(error => error.msg + ' ' + error.param)
        return res.status(400).json({ message: messages.toString(), status: 400 });
        return;
    }
    next();
}