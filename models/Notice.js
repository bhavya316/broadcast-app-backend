
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notice = sequelize.define("Notice", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  attachment: DataTypes.STRING,
  reminder_date: DataTypes.DATE,
}, {
  paranoid: true
});

module.exports = Notice;