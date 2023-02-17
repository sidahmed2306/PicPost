const { User, Post } = require("../../models");

async function showUsers({ idUser }) {
  console.log("ich", idUser);
  // const user = await User.find({}).sort({ createdAt: -1 });
  const user = await User.find({ _id: { $ne: idUser } }).sort({
    createdAt: -1,
  });
  //   .populate([
  //     "author",
  //     "comments.author",
  //     "comments.text",
  //     // "followers.author",
  //     // "following.author",
  //   ]);

  return {
    user,
  };
}

module.exports = { showUsers };
