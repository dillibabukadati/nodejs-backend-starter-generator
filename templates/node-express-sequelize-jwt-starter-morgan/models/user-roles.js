const Sequelize = require("sequelize")
const sequelize = require("../utils/database");
const User = require("./user-model");

const UserRoles = sequelize.define('user_roles', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    roleName: Sequelize.STRING,
})

module.exports = UserRoles