const express = require("express");
const User = require("../models/user.js");
const protect = require("../middleware/auth.js");
const passport = require("passport");
const upload = require("../middleware/upload");
const { rateUser } = require("../controllers/userController");

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

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
});

router.patch("/profile", protect, async (req, res) => {
  const {
    fullName,
    bio,
    skillsknown,
    skillsneeded,
    location,
    profiletype,
    availability,
  } = req.body;

  try {
    const updates = {};

    if (fullName) updates.fullName = fullName;
    if (bio) updates.bio = bio;
    if (location) updates.location = location;
    if (typeof profiletype === "boolean") updates.profiletype = profiletype;
    if (availability) updates.availability = availability;

    // Skills update logic
    if (skillsknown) {
      if (!Array.isArray(skillsknown) || skillsknown.length === 0) {
        return res.status(400).json({ message: "At least one skillknown is required" });
      }
      updates.skillsknown = skillsknown;
    }

    if (skillsneeded) {
      if (!Array.isArray(skillsneeded) || skillsneeded.length === 0) {
        return res.status(400).json({ message: "At least one skillsneeded is required" });
      }
      updates.skillsneeded = skillsneeded;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
});




// Upload cover image
router.post("/upload-cover", protect, upload.single("coverImage"), async (req, res) => {
  try {
    const imageUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { coverImage: imageUrl },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Cover image uploaded successfully",
      coverImage: imageUrl,
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload image", error: error.message });
  }
});




// passport.authenticate('session') or custom middleware for session check


router.post("/rate/:id", protect, rateUser);



module.exports = router;
