const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load .env variables

// Create a Sequelize instance using individual environment variables
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: "postgres",
  logging: false, // Set to true if you want SQL logs in the console
});

// Test PostgreSQL Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connection Successful!");
  } catch (error) {
    console.error("❌ PostgreSQL Connection Failed:", error);
  }
})();

// MongoDB Connection
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

module.exports = { connectDB, sequelize };
