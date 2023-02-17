const mongoose = require("mongoose");

const avatarPlaceHolder =
  "https://hszteam.de/wp-content/uploads/2021/01/avatar-placeholder.gif";

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  userName: { type: String, require: true },
  birthDate: { type: String, require: true },
  email: { type: String, require: true },
  passwordSalt: { type: String, require: true },
  passwordhash: { type: String, require: true },
  telNumber: { type: String, require: false },
  gender: { type: String, require: true },
  bio: { type: String, require: false },
  link: { type: String, require: false },
  job: { type: String, require: false },
  // profilPicture: { type: String, default: avatarPlaceHolder },
  profilePicture: {
    id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      default: avatarPlaceHolder,
    },
  },
  followers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    { state: false },
  ],
  following: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    { state: false },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
