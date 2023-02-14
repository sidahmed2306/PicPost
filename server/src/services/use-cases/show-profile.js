const { User, Post } = require("../../models");

async function showProfile({ userId }) {
  const user = await User.findById(userId);
  const userid = user._id;
  const post = await Post.find({ userid });

  const postImage = post.map((elt) => elt.img);
  console.log(post);
  const postCount = post.length;
  const followers = user.followers;
  console.log("imgs", postImage);
  const followersCount = followers.length;

  const following = user.following;
  const followingCount = following.length;
  if (!user) {
    throw new Error("User not Found");
  }
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilPicture,
    bio: user.bio,
    userName: user.userName,
    link: user.link,
    job: user.job,
    link: user.link,
    postPicturs: post.img,
    postCount,
    followersCount,
    followingCount,
    postImage,
  };
}

module.exports = { showProfile };
