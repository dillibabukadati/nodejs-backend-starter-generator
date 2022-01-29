const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.encrypt = async (value) => {
    const encryptedPassword = await bcrypt.hash(value, saltRounds);
    return encryptedPassword;
}
exports.isValidPassword = async (password, encryptedPassword) => {
    return await bcrypt.compare(password, encryptedPassword);
}