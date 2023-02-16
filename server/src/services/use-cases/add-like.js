const { Post } = require("../../models");

async function addLike({ postId, author }) {
  try {
    const post = await Post.findById(postId);
    console.log("post", post);
    if (!post) {
      throw new Error("Post not found");
    }

    post.likes.push(author);
    await post.save();
    return post;
  } catch (err) {
    throw new Error(`Could not add comment: ${err.message}`);
  }
}

module.exports = {
  addLike,
};
