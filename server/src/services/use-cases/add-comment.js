const { User, Post } = require("../../models");

async function addComment({ postId, text, author }) {
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    const newComment = {
      text,
      author,
    };
    post.comments.push(newComment);
    await post.save();
    return newComment;
  } catch (err) {
    throw new Error(`Could not add comment: ${err.message}`);
  }
}

module.exports = {
  addComment,
};
