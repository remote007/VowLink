const ActivityLog = require("../models/ActivityLog");

exports.getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.findAll();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLog = async (userId, action, details) => {
  try {
    await ActivityLog.create({ userId, action, details });
  } catch (err) {
    console.error("Logging error:", err.message);
  }
};
