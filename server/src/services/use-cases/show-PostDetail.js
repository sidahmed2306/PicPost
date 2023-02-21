const { User, Post } = require("../../models");

async function showPostDetail({ postId, profileId }) {
  console.log("profileId", profileId);
  console.log("postId", postId);
  const user = await User.findById(profileId);
  const post = await Post.findById(postId).populate([
    "author",
    "comments.author",
  ]);
  const profileImg = user.profilePicture.url;

  if (!post) {
    throw new Error("post not Found");
  }
  return {
    post,
    user,
  };
}

module.exports = { showPostDetail };
