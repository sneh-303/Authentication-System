const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: "Profile picture is required" });
  }

  const ProfilePicture = req.file.path;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "A user already exists with this email address" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate new serial number
    const lastUser = await User.findOne({
  order: [['serialNumber', 'DESC']],
});
const newSerialNumber = lastUser ? lastUser.serialNumber + 1 : 1;


    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      serialNumber: newSerialNumber,
      ProfilePicture,
    });

    return res.status(201).json({ msg: "User registered successfully", userId: newUser.id });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    const expiryTimeStamp = jwt.decode(token)?.exp;

    return res.json({ token, expiryTimeStamp });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Profile
exports.profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// User List
exports.userList = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.json(users);
  } catch (err) {
    console.error("User list error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// PUT (Replace Entire User)
exports.putUser = async (req, res) => {
  try {
    const { serialNumber } = req.params;
    const updatedData = req.body;

    const user = await User.findOne({ where: { serialNumber } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.update(updatedData);
    return res.status(200).json({ msg: "PUT success", updatedUser: user });
  } catch (err) {
    console.error("PUT error:", err);
    return res.status(500).json({ msg: "Error updating user", error: err.message });
  }
};

// PATCH (Update Partial Fields)
exports.patchUser = async (req, res) => {
  try {
    const { serialNumber } = req.params;
    const updateData = req.body;

    const user = await User.findOne({ where: { serialNumber } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.update(updateData);
    return res.status(200).json({ msg: "PATCH success", updatedUser: user });
  } catch (err) {
    console.error("PATCH error:", err);
    return res.status(500).json({ msg: "Error updating user", error: err.message });
  }
};

// DELETE User
exports.deleteUser = async (req, res) => {
  try {
    const { serialNumber } = req.params;

    const user = await User.findOne({ where: { serialNumber } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.destroy();
    return res.status(200).json({ msg: "DELETE success", deletedUser: user });
  } catch (err) {
    console.error("DELETE error:", err);
    return res.status(500).json({ msg: "Error deleting user", error: err.message });
  }
};
