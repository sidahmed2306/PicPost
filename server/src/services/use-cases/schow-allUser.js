const { User, Post } = require("../../models");

async function showUsers({ idUser, profileId }) {
  console.log("prodile", profileId);

  const user = await User.find({ _id: { $ne: idUser } })
    .sort({
      createdAt: -1,
    })
    .populate(["followers", "following"]);

  console.log(user);
  //   .populate([
  //     "author",
  //     "comments.author",
  //     "comments.text",
  //     // "followers.author",
  //     // "following.author",
  //   ]);

  return {
    user,
    idUser,
  };
}

module.exports = { showUsers };
