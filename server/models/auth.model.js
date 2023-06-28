const mongoose = require('mongoose');
// user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: false,
      unique: false,
      lowercase: true,
    },
    userName: {
      type: String,
      trim: true,
    },
    isArtist: Boolean,
    preferences: [String],

    walletID: {
      type: String,
      unique: true,
      required: true,
    },
    fav: String,
  },
  {
    timestamps: true,
  }
);

// virtual

// methods

module.exports = mongoose.model('User', userSchema);
