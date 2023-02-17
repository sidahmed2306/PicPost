// const { User, Post } = require("../../models");

// async function showPosts(userId) {
//   console.log("userId", userId);

//   const posts = await Post.find({}).sort({ createdAt: -1 }).populate([
//     "author",
//     "comments.author",
//     "comments.text",
//     // "followers.author",
//     // "following.author",
//   ]);

//   const comments = posts.map((elt) => elt.comments);

//   return {
//     posts,
//   };
// }

// module.exports = { showPosts };

const { User, Post } = require("../../models");

async function showPosts(userId) {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate(["author", "comments.author", "comments.text", "likes"]);

  // Update the state field of the like for the specified user
  // posts.forEach((post) => {
  //   post.likes.forEach((like) => {
  //     console.log(like);
  //     if (like._id.toString() === userId.toString()) {
  //       like.state = true;
  //     }
  //   });
  //   post.save();
  // });

  return {
    posts,
    myUserId: userId,
  };
}

module.exports = { showPosts };
