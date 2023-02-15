const { addPost } = require("./use-cases/add-post");
const { userLogin } = require("./use-cases/user-login");
const { userRegister } = require("./use-cases/user-register");
const { editProfile } = require("./use-cases/edit-profile");
const { showProfile } = require("./use-cases/show-profile");
const { showPosts } = require("./use-cases/show-posts");
const { showUsers } = require("./use-cases/schow-allUser");
const { showProfileDetail } = require("./use-cases/schow-detail-profil");

const UserServices = {
  userRegister,
  userLogin,
  editProfile,
  showProfile,
  showPosts,
  showUsers,
  showProfileDetail,
};

const PostServices = {
  addPost,
};
module.exports = {
  UserServices,
  PostServices,
};
