const { User, Post } = require("../../models");

async function showPostDetail({ postId }) {
  const post = await Post.findById(postId).populate(["author"]);

  if (!post) {
    throw new Error("post not Found");
  }
  return {
    post,
  };
}

module.exports = { showPostDetail };
