const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config')

exports.generateJwtToken = (user) => {

    // expiration 1 month
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
        userId: user.userId
    }, JWT_SECRET, { algorithm: 'HS256' });

}
exports.validateToken = (token) => {
    try {
        const isValid = jwt.verify(token, JWT_SECRET, { algorithm: 'HS256' });
        return isValid;
    } catch (error) {
        console.error('Invalid token');
        throw error;
    }
}