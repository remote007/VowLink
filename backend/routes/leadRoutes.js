const express = require("express");
const router = express.Router();
const { 
  getAllLeads, 
  createLead,  // ✅ Added missing createLead
  updateLead,  // ✅ Fixed naming to match controller
  assignLead 
} = require("../controllers/leadController");

const { protect } = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");

// ✅ Protected routes
router.get("/", protect, getAllLeads); // Get all leads
router.post("/", protect, createLead); // Create a new lead
router.put("/update/:id", protect, updateLead); // Update lead details (fixed function name)
router.post("/assign/:id", protect, requireRole("admin"), assignLead); // Assign lead (Admins only)

module.exports = router;
