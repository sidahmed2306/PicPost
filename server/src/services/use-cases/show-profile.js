const { User, Post } = require("../../models");

async function showProfile({ userId }) {
  const user = await User.findById(userId);
  const userid = user._id;
  const post = await Post.find({ userid });
  console.log(post);
  const postCount = post.length;
  if (!user) {
    throw new Error("User not Found");
  }
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture,
    bio: user.bio,
    link: user.link,
    job: user.job,
    postPicturs: post.img,
    postCount,
  };
}

module.exports = { showProfile };
