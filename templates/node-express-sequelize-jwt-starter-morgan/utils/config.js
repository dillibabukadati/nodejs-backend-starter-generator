const config = require('../config.json')
exports.DB_HOST = config.db.host
exports.DB_NAME = config.db.database
exports.DB_USERNAME = config.db.userName
exports.DB_PASSWORD = config.db.password
exports.APP_PORT = config.app.port
exports.JWT_SECRET = config.jwt.secret
exports.LOG_BASE_PATH = config.app.logBasePage