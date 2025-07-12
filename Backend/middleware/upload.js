const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "coverImages", // optional
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => `cover_${Date.now()}`
  },
});

const upload = multer({ storage });

module.exports = upload;
