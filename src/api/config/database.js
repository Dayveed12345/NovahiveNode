const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blockdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
