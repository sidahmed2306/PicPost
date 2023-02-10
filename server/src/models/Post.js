const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postPicture: { type: String, require: true },
  caption: { type: String, default: "" },
  LikedBy: {
    type: [String],
  },
  comment: { type: String, default: "" },
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
