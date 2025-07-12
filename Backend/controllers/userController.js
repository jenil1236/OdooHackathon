const User = require('../models/user');

const rateUser = async (req, res) => {
  try {
    const raterId = req.user._id;
    const { id } = req.params; // target user ID
    const { stars, comment } = req.body;

    if (raterId.toString() === id.toString()) {
      return res.status(400).json({ message: "You cannot rate yourself" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingRating = user.ratings.find(
      (r) => r.from.toString() === raterId.toString()
    );

    if (existingRating) {
      // Update existing rating
      existingRating.stars = stars;
      existingRating.comment = comment;
    } else {
      // Add new rating
      user.ratings.push({ from: raterId, stars, comment });
    }

    // Recalculate averageRating
    const total = user.ratings.reduce((sum, r) => sum + r.stars, 0);
    user.averageRating = total / user.ratings.length;

    await user.save();

    res.status(200).json({ message: "Rating submitted", averageRating: user.averageRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  
  rateUser
};