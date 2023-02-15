const { User, Post } = require("../../models");

async function showPosts() {
  const posts = await Post.find({}).sort({ date: -1 }).populate([
    "author",
    "comments.author",
    // "followers.author",
    // "following.author",
  ]);

  console.log(posts);

  return {
    posts,
  };
}

module.exports = { showPosts };
