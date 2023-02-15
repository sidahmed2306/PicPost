const { PostServices } = require("../services");
const { fileUploadAndRemove } = require("../services/utilis/uploadDao");
const { catchErrors } = require("./catchError");
const fs = require("fs");

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
module.exports = {
  addPost,
};
