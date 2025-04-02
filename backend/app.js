require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const { connectDB,sequelize } = require("./config/db"); 

// Import Middleware
const { protect } = require("./middlewares/authMiddleware");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const scrapeRoutes = require("./routes/scrapeRoutes");

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Session & Passport for OAuth
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
connectDB(); // Connect to MongoDB

sequelize.sync({ alter: true }).then(() => {
  console.log("📌 PostgreSQL Tables Synced!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", protect, leadRoutes);
app.use("/api/scrape", protect, scrapeRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("🚀 Wedding Lead Aggregator API is Running!");
});

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
