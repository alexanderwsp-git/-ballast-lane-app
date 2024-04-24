const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-prod'); // Import Sequelize instance for production

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
