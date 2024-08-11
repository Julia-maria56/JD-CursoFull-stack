const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Event = sequelize.define('Events', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Event;
