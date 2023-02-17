const { Post } = require("../../models");

async function addPost({ img, caption, author, comments }) {
  // const result = await Post.updateMany(
  //   {},
  //   {
  //     $set: {
  //       "likes.$[].state": false,
  //     },
  //   }
  // );
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
