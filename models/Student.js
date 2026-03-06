
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define("Student", {
  erp_id: {
    type: DataTypes.STRING,
    unique: true,
  },
  dob: DataTypes.DATEONLY,
  address: DataTypes.TEXT,
}, {
  paranoid: true
});

module.exports = Student;