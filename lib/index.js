let sq = require('sequelize');

let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './Database.sqlite',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
