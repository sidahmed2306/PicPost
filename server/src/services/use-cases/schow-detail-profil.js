const { User, Post } = require("../../models");

async function showProfileDetail({ userId }) {
  const user = await User.findById(userId);
  const post = await Post.find({ author: userId }).sort({ createdAt: -1 });
  const postCount = post.length;
  const followers = user.followers;
  const followersCount = followers.length;
  const following = user.following;
  const followingCount = following.length;

  if (!user) {
    throw new Error("User not Found");
  }
  return {
    followingCount,
    followersCount,
    postCount,
    user,
    post,
  };
}

module.exports = { showProfileDetail };
