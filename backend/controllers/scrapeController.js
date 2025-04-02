const { scrapeEmails } = require("../utils/emailScraper");

// ✅ Connect Gmail/Outlook OAuth
exports.connectEmail = async (req, res) => {
  try {
    // Here, you would handle OAuth login flow (Google/Outlook)
    res.json({ message: "OAuth connection initiated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Check scraping status
exports.checkScrapeStatus = async (req, res) => {
  try {
    // Example: Fetch status from the database or job queue
    res.json({ status: "Scraping in progress" }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Manually trigger email scraping
exports.manualScrape = async (req, res) => {
  try {
    const results = await scrapeEmails(req.user.email);
    res.json({ message: "Manual scraping started", results });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

