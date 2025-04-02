const express = require("express");
const router = express.Router();
const { connectEmail, checkScrapeStatus, manualScrape } = require("../controllers/scrapeController");
const { protect } = require("../middlewares/authMiddleware");

// Connect Gmail/Outlook OAuth
router.post("/connect", protect, connectEmail);

// Check scraping status
router.get("/status", protect, checkScrapeStatus);

// Manually trigger scraping
router.post("/manual", protect, manualScrape);

module.exports = router;
