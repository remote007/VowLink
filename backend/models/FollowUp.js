const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const FollowUp = sequelize.define("FollowUp", {
  leadId: { type: DataTypes.INTEGER, allowNull: false },
  notes: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING, defaultValue: "Pending" },
  followUpDate: { type: DataTypes.DATE, allowNull: false },
}, { timestamps: true });

module.exports = FollowUp;
