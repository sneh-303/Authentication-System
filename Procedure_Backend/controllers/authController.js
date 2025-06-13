const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool =require('../config/db')


// Register route
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: "Profile picture is required" });
  }

  const profilePicture = req.file.path;

  try {
    // Hash password BEFORE calling the stored procedure
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Call the stored procedure using mysql2/promise connection
    const [result] = await pool.query(
      "CALL RegisterUser(?, ?, ?, ?)",
      [name, email, hashedPassword, profilePicture]
    );

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: err.message || "Server error" });
  }
};


// Login route
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
        // Call stored procedure to get user by email
    const [users] = await pool.query('CALL LoginUser(?)', [email]);

    const user = users[0][0]; 
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    const decoded = jwt.decode(token);
    const expiryTimeStamp = decoded?.exp;

    res.json({ token, expiryTimeStamp });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  } 
};

// Profile route
exports.profile = async (req, res) => {
const userId = req.user?.userId;
console.log("id being passed to procedure:", userId);
  try {
    const [results] = await pool.query('CALL GetProfileUser(?)',[userId]);

    const user = results?.[0]?.[0];
    if (!user) return res.status(404).json({ msg: "User not found" });

    delete user.password; // remove password before sending response
    res.json(user);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all users
exports.userList = async (req, res) => {
  try {
    const [results] = await pool.query('CALL GetALLUser()');

    const user = results?.[0];
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT user
exports.putUser = async (req, res) => {
  try {
    const { serialNumber } = req.params;
    const updatedData = req.body;

    const affectedRows = await User.replaceUser(serialNumber, updatedData);
    if (!affectedRows) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "PUT success" });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

// PATCH user
exports.patchUser = async (req, res) => {
  try {
    const { serialNumber } = req.params;
    const updateData = req.body;

    const affectedRows = await User.updateUser(serialNumber, updateData);
    if (!affectedRows) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "PATCH success" });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const { serialNumber } = req.params;

    const affectedRows = await User.deleteUser(serialNumber);
    if (!affectedRows) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "DELETE success" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};











