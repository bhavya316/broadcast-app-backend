
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Teacher = sequelize.define("Teacher", {
  education: DataTypes.STRING,
  degree: DataTypes.STRING,
  subject_taught: DataTypes.STRING,
  id_proof: DataTypes.STRING,
}, {
  paranoid: true
});

module.exports = Teacher;