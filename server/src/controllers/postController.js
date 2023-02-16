const { PostServices } = require("../services");
const { fileUploadAndRemove } = require("../services/utilis/uploadDao");
const { catchErrors } = require("./catchError");
const fs = require("fs");
const { text } = require("express");



const addPost = catchErrors(async (req, res) => {
  const uploader = async (path) => await fileUploadAndRemove(path, "Images");
  const file = req.files[0];
  const { path } = file;
  const newPath = await uploader(path);
  console.log(newPath);
  fs.unlink(path, (err) => {
    console.log(err);
  });
  const newPost = {
    img: newPath,
    caption: req.body.caption,
    author: req.verifiedUserClaims.sub,
    comments: req.body.comments,
  };
  console.log(newPost);
  const result = await PostServices.addPost(newPost);
  return res.json({
    status: "ok",
    result,
  });
});
const getShowPostDetail = catchErrors(async (req, res) => {
  const postId = req.params.id;

  const result = await PostServices.showPostDetail({ postId });
  return res.json({
    status: "ok",
    result,
  });
});

const postAddComment = catchErrors(async (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  author = req.verifiedUserClaims.sub;
  console.log(author);
  const text = req.body.text;
  console.log(text);
  const newComment = {
    text: text,
    author: author,
    postId,
  };
  const result = await PostServices.addComment(newComment);
  return res.json({
    status: "ok",
    result,
  });
});
const postAddLike = catchErrors(async (req, res) => {
  const postId = req.body.id;
  console.log(postId);
  author = req.verifiedUserClaims.sub;
  console.log(author);

  const result = await PostServices.addLike({ postId, author });
  return res.json({
    status: "ok",
    result,
  });
});
module.exports = {
  addPost,
  postAddComment,
  getShowPostDetail,
  postAddLike,
  
};
