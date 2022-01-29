const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = require('./config')

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});

module.exports = sequelize;