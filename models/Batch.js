
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Batch = sequelize.define("Batch", {
  name: DataTypes.STRING,
}, {
  paranoid: true
});

module.exports = Batch;