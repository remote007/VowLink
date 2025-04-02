const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING, defaultValue: "Pending" },
  dueDate: { type: DataTypes.DATE },
  assignedTo: { type: DataTypes.INTEGER },  // User ID (PostgreSQL relation)
}, { timestamps: true });

module.exports = Task;
