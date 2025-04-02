const { google } = require("googleapis");
const Lead = require("../models/Lead");

// Function to scrape Gmail inbox
const scrapeGmailLeads = async (auth) => {
    const gmail = google.gmail({ version: "v1", auth });

    const res = await gmail.users.messages.list({
        userId: "me",
        maxResults: 10, // Fetch latest 10 emails
    });

    const messages = res.data.messages || [];
    let extractedLeads = [];

    for (let msg of messages) {
        let msgData = await gmail.users.messages.get({ userId: "me", id: msg.id });
        let emailBody = msgData.data.snippet;

        let extractedLead = {
            name: extractName(emailBody),
            email: extractEmail(emailBody),
            phone: extractPhone(emailBody),
            status: "New",
        };

        if (extractedLead.email) {
            await Lead.create(extractedLead);
            extractedLeads.push(extractedLead);
        }
    }

    return extractedLeads;
};

// Helper function to extract email from text
const extractEmail = (text) => {
    const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    return match ? match[0] : null;
};

// Helper function to extract phone number from text
const extractPhone = (text) => {
    const match = text.match(/\+?[0-9]{10,}/);
    return match ? match[0] : null;
};

// Helper function to extract name from text
const extractName = (text) => {
    return text.split(" ")[0] || "Unknown";
};

module.exports = {
    scrapeGmailLeads,
};
