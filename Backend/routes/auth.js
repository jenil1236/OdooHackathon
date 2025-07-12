const express = require("express");
const User = require("../models/user.js");
const protect = require("../middleware/auth.js");
const passport = require("passport");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password, fullName } = req.body;
  try {
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password, fullName });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      message: "User registered successfully",
    });
  } catch (error) {
res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

// LOGIN
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    fullName: req.user.fullName,
    message: "User logged in successfully",
  });
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// ME (protected route)
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    fullName: req.user.fullName
  });
});

module.exports = router;
