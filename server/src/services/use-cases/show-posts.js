const { User, Post } = require("../../models");

async function showPosts() {
  const posts = await Post.find({}).sort({ createdAt: -1 }).populate([
    "author",
    "comments.author",
    "comments.text",
    // "followers.author",
    // "following.author",
  ]);

  const comments = posts.map((elt) => elt.comments);
  console.log(comments);
  return {
    posts,
  };
}

module.exports = { showPosts };
