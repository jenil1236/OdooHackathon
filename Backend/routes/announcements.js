const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");
const passport = require("passport");

// Create announcement (protected route)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { title, body } = req.body;

      const announcement = new Announcement({
        title,
        body,
        issued_by: req.user._id,
      });

      await announcement.save();
      res.status(201).json(announcement);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate("issued_by", "username email") // Include user details
      .sort({ created_at: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single announcement
router.get("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate(
      "issued_by",
      "username email"
    );

    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update announcement (protected route)
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const announcement = await Announcement.findOneAndUpdate(
        { _id: req.params.id, issued_by: req.user._id }, // Only owner can update
        req.body,
        { new: true }
      );

      if (!announcement) {
        return res
          .status(404)
          .json({ error: "Announcement not found or unauthorized" });
      }

      res.json(announcement);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete announcement (protected route)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const announcement = await Announcement.findOneAndDelete({
        _id: req.params.id,
        issued_by: req.user._id, // Only owner can delete
      });

      if (!announcement) {
        return res
          .status(404)
          .json({ error: "Announcement not found or unauthorized" });
      }

      res.json({ message: "Announcement deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
