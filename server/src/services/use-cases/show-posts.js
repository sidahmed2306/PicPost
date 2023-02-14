const { User, Post } = require("../../models");

async function showPosts() {
  const posts = await Post.find({}).sort({ date: -1 });
  console.log(posts.map((elt) => elt.author));
  const postAuthor = posts.author;
  const user = await User.findById(postAuthor);
  const comments = posts.comments;
  const commentText = comments.map((elt) => elt.text);
  const commentDat = comments.map((elt) => elt.createdAt);
  const commentAuthId = comments.map((elt) => elt.author);
  const commentAuth = await User.findById(commentAuthId);
  const commentAuthInfo = commentAuth.userName;
  const likes = posts.likes;
  const likesCount = likes.length;
  const PostLikersId = likes.map((elt) => elt);
  const PostLikers = await User.findById(PostLikersId);

  if (!user) {
    throw new Error("User not Found");
  }
  return {
    profilePicture: user.profilPicture,
    userName: user.userName,
    job: user.job,
    postImg: posts.img,
    caption: posts.caption,
    createdAt: posts.createdAt,
    commentText,
    commentDat,
    commentAuthInfo,
    likesCount,
    PostLikers,
  };
}

module.exports = { showPosts };
