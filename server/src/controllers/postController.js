const { PostServices } = require("../services");
const { catchErrors } = require("./catchError");

const addPost = catchErrors(async (req, res) => {
  const newPost = {
    img: req.body.img,
    caption: req.body.caption,
    comments: req.body.comments,
    author: req.verifiedUserClaims.sub,
  };
  const result = await PostServices.addPost(newPost);
  return res.json({
    status: "ok",
    result,
  });
});
module.exports = {
  addPost,
};
