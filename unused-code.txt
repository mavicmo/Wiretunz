const mongoose = require("../connection/connection");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      require: true,
      match: [/^[a-zA-A0-9]+$/, "is valid"],
      index: true,
    },
    password: {
      type: String,
      lowercase: true,
      require: true,
      match: /^[a-zA-A0-9]+$/,
      index: true,
      unique: true,
    },

    email: {
      type: String,
      lowercase: true,
      require: true,
      match: [/^[a-zA-A0-9]+$/, "is valid"],
      index: true,
      unique: true,
    },

    bio: String,
    image: String,
  },
  { timestamps: true }
);

const User = mongoose.model(UserSchema);

module.exports = User;
