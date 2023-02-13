const { Post } = require("../../models");

async function addPost({ image, caption, author, comments }) {
  const post = await Post.create({
    image,
    caption,
    author,
    comments,
  });
  return post;
}
module.exports = {
  addPost,
};
