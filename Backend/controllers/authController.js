const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register route
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!req.file) {
    return res.status(400).json({ msg: "Profile picture is required" });
  }
  const ProfilePicture = req.file.path;

  try {
    // Check if user with this email exists
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ msg: "A user already exists with this e-mail address" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Find last user's serialNumber
    const lastUser = await User.findOne().sort({ serialNumber: -1 });
    const newSerialNumber = lastUser ? lastUser.serialNumber + 1 : 1;

    // Create new user with serialNumber
    user = new User({
      name,
      email,
      password: hashedPassword,
      serialNumber: newSerialNumber,
      ProfilePicture,
    });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login route
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const decoded = jwt.decode(token);
    const expiryTimeStamp = decoded?.exp;
    console.log(
      "Token expiration (exp):",
      expiryTimeStamp,
      "->",
      new Date(expiryTimeStamp * 1000)
    ); // mutliply with 1000 means converting into ms

    res.json({ token, expiryTimeStamp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// profile
exports.profile = async (req, res) => {
  try {
    console.log("User ID from token:", req.user.userId);
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
// UserList (display all users)
exports.userList = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Fetch all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.putUser = async (req, res) => {
  try {
    const { serialNumber } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findOneAndReplace({ serialNumber }, updatedData,{ new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "PUT success", updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

exports.patchUser = async (req, res) => {
  try {
    const { serialNumber } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { serialNumber },
      { $set: updateData },
      { new: true } // ensures the updated document is returned
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "PATCH success", updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { serialNumber } = req.params;

    const deletedUser = await User.findOneAndDelete({ serialNumber });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "DELETE success", deletedUser });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};
