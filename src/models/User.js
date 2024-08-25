const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      
});

User.beforeCreate(async (user) => {
  const password = user.password
  const hashPassword = await bcrypt.hash(password, 10)
  user.password = hashPassword
})

module.exports = User;