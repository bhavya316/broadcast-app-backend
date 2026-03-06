
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("student", "teacher"),
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
  }
}, {
  paranoid: true
});

module.exports = User;