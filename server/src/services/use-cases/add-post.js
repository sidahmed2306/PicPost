const { Post } = require("../../models");

async function addPost({ img, caption, author, comments }) {
  const post = await Post.create({
    img,
    caption,
    author,
    comments,
  });
  return post;
}
module.exports = {
  addPost,
};
