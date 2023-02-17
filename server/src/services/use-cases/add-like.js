const { Post } = require("../../models");

async function addLike({ postId, author }) {
  try {
    let state = false;
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }
    const index = post.likes.findIndex(
      (p) => p.toString() === author.toString()
    );

    if (index === -1) {
      state = true;
      post.likes.push(author);
      await post.save();
      return post;
    } else {
      post.likes.splice(index, 1);
      await post.save();

      return { post, state };
    }
  } catch (err) {
    throw new Error(`Could not add comment: ${err.message}`);
  }
}

module.exports = {
  addLike,
};
