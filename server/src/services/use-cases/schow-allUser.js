const { User, Post } = require("../../models");

async function showUsers({}) {
  const user = await User.find({}).sort({ createdAt: -1 });
  //   .populate([
  //     "author",
  //     "comments.author",
  //     "comments.text",
  //     // "followers.author",
  //     // "following.author",
  //   ]);

  console.log(user);
  return {
    user,
  };
}

module.exports = { showUsers };
