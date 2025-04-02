const Lead = require("../models/Lead");

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate("assignedTo");
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.assignLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, { assignedTo: req.body.userId }, { new: true });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("assignedTo");
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

