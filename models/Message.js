
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define("Message", {
  message: DataTypes.TEXT,
  type: DataTypes.ENUM("personal", "group"),
}, {
  paranoid: true
});

module.exports = Message;