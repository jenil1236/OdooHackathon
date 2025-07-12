const mongoose = require("mongoose"); // Add this line
const { Schema } = mongoose;

const announcementSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  issued_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Announcement", announcementSchema);
