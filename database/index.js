const {Sequelize} = require('sequelize');
const database = require('../config/database');
const Behavior = require('../models/Behavior');

const sequelize = new Sequelize(database);

Behavior.init(sequelize);

module.exports = sequelize;