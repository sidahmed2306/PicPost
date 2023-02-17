const { User, Post } = require("../../models");

async function showProfileDetail({ userId, profileId }) {
  const user = await User.findById(userId);
  let state = false;
  const profile = await User.findById(profileId);

  const index = user.followers.findIndex(
    (i) => i.toString() === profileId.toString()
  );
  console.log("index", index);
  if (index !== -1) {
    state = true;
  }
  const post = await Post.find({ author: userId }).sort({ createdAt: -1 });
  const postCount = post.length;
  const followers = user.followers;
  const followersCount = followers.length;
  const following = user.following;
  const followingCount = following.length;
  console.log("idvon user", profile._id);
  if (!user) {
    throw new Error("User not Found");
  }
  return {
    followingCount,
    followersCount,
    postCount,
    user,
    post,
    profileId: profile._id,
    state,
  };
}

module.exports = { showProfileDetail };
