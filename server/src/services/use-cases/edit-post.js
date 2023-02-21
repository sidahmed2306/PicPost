const { Post } = require("../../models");

async function editProfile({ postId, caption }) {
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $set: {
        caption,
      },
    },
    { new: true }
  ).exec();
  console.log("post", post);
  return {
    caption: caption,
  };
}

module.exports = {
  editProfile,
};
