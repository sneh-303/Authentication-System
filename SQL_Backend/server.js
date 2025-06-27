const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/db");
// const User = require('./models/User')

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));


app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/authRoute"));

// Test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Sync Sequelize models to DB
sequelize
  .sync() 
  .then(() => {
    console.log("All models synced to the database.");
  })
  .catch((error) => {
    console.error("Failed to sync models:", error);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
