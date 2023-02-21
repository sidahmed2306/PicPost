const { User, Post } = require("../../models");

async function showProfile({ userId }) {
  const user = await User.findById(userId).populate(["following", "followers"]);
  console.log(user);
  const post = await Post.find({ author: userId }).sort({ createdAt: -1 });
  // console.log(post);
  // const posts = await Post.find({}).sort({ date: -1 }).populate([
  //   "author",
  //   "comments.author",
  //   // "followers.author",
  //   // "following.author",
  // ]);
  const postImage = post.map((elt) => elt.img);
  const postCount = post.length;
  const followers = user.followers;
  const followersCount = followers.length;
  const following = user.following;
  const followingCount = following.length;
  const birthDate = user.birthDate;
  const telNumber = user.telNumber;
  const postId = post._id;
  const _id = user._id;

  if (!user) {
    throw new Error("User not Found");
  }
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture,
    bio: user.bio,
    userName: user.userName,
    birthDate,
    link: user.link,
    job: user.job,
    link: user.link,
    post,
    postPicturs: post.img,
    postCount,
    followersCount,
    followingCount,
    postImage,
    telNumber,
    _id,
    postId,
    user,
  };
}

module.exports = { showProfile };
