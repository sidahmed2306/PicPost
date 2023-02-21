const { addPost } = require("./use-cases/add-post");
const { userLogin } = require("./use-cases/user-login");
const { userRegister } = require("./use-cases/user-register");
const { editProfile } = require("./use-cases/edit-profile");
const { showProfile } = require("./use-cases/show-profile");
const { showPosts } = require("./use-cases/show-posts");
const { showUsers } = require("./use-cases/schow-allUser");
const { showProfileDetail } = require("./use-cases/schow-detail-profil");
const { addComment } = require("./use-cases/add-comment");
const { showPostDetail } = require("./use-cases/show-PostDetail");
const { addLike } = require("./use-cases/add-like");
const { refreshToken } = require("./use-cases/refresh-token");
const { addfollowers } = require("./use-cases/add-follow");
const { forgotPassword } = require("./use-cases/forgot-password");
const { resetPassword } = require("./use-cases/reset-password");
const { sendVerficationMail } = require("./utilis/send-verficationMail");
const { userVerification } = require("./use-cases/verfication_code");
const { updatePostCaption } = require("./use-cases/edit-post");
const { deletePost } = require("./use-cases/delete-post");

const UserServices = {
  refreshToken,
  userRegister,
  userLogin,
  editProfile,
  showProfile,
  showPosts,
  showUsers,
  showProfileDetail,
  addfollowers,
  forgotPassword,
  userVerification,
  resetPassword,
  sendVerficationMail,
};

const PostServices = {
  addPost,
  addComment,
  showPostDetail,
  addLike,
  updatePostCaption,
  deletePost,
};
module.exports = {
  UserServices,
  PostServices,
};
