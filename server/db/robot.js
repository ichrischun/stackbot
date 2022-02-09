const Sequelize = require('sequelize');
const db = require('./database');

const Robot = db.define('robot', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fuelType: {
    type: Sequelize.ENUM('gas', 'diesel', 'electric'),
    defaultValue: 'electric',
  },
  fuelLevel: {
    type: Sequelize.FLOAT,
    defaultValue: 100,
    validate: {
      min: 0,
      max: 100,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://i0.wp.com/dronebotworkshop.com/wp-content/uploads/2016/01/robot2-e1504969973917.png?w=346&ssl=1',
  },
});

module.exports = Robot;
