const { PostServices } = require("../services");
const { catchErrors } = require("./catchError");

const addPost = catchErrors(async (req, res) => {
  const newPost = {
    img: req.file.path,
    caption: req.body.caption,
    comments: req.body.comments,
    author: req.verifiedUserClaims.sub,
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
