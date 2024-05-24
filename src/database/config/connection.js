const Sequelize = require('sequelize')
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize