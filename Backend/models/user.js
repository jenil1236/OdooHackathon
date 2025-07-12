const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // Important for search
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    coverImage: {
      type: String, // Cloudinary URL
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    skillsknown: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    skillsneeded: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    location: {
      type: String,
      default: '',
    },
    profiletype: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: String,
      default: "weekends", // Example: "weekdays", "evenings", etc.
    },
    ratings: [
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who rated
    stars: { type: Number, min: 1, max: 5 },
    comment: { type: String, default: '' }
  }
],
averageRating: { type: Number, default: 0 }


  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
  
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


