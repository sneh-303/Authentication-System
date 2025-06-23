const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const pool = require("./config/db");
dotenv.config();

const app = express();
const { UpdateEveryTime, AllData } = require('./Cron-Schedule/CronSchedule');


// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "https://authentication-system-puce.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));


// Static route for image uploads
// app.use("/uploads", express.static("uploads"));

// Auth routes
app.use("/api/auth", require("./routes/authRoute"));

// DB test connection
pool.getConnection((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

UpdateEveryTime();
AllData();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



