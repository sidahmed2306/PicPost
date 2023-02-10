const mongoose = require("mongoose");

const avatarPlaceHolder =
  "https://hszteam.de/wp-content/uploads/2021/01/avatar-placeholder.gif";

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  userName: { type: String, require: true },
  birthDate: { type: Number, require: true },
  email: { type: String, require: true },
  passwordSalt: { type: String, require: true },
  passwordhash: { type: String, require: true },
  telNumber: { type: Number, require: false },
  gender: { type: String, require: true },
  bio: [
    {
      description: { type: String, require: false },
      link: { type: String, require: false },
      job: { type: String, require: false },
    },
  ],
  profilPicture: { type: String, default: avatarPlaceHolder },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
