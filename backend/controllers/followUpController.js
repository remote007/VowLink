const FollowUp = require("../models/FollowUp");

exports.getAllFollowUps = async (req, res) => {
  try {
    const followUps = await FollowUp.findAll();
    res.json(followUps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFollowUp = async (req, res) => {
  try {
    const followUp = await FollowUp.create(req.body);
    res.status(201).json(followUp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
