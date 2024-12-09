let { DataTypes, sequelize } = require('../lib/');
let track = sequelize.define('track', {
  name: DataTypes.TEXT,
  age: DataTypes.INTEGER,
  gender: DataTypes.TEXT,
});
module.exports = { track };
