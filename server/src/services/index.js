const { addPost } = require("./use-cases/add-post");
const { userLogin } = require("./use-cases/user-login");
const { userRegister } = require("./use-cases/user-register");
const { editProfile } = require("./use-cases/edit-profile");
const { showProfile } = require("./use-cases/show-profile");
const { showPosts } = require("./use-cases/show-posts");

const UserServices = {
  userRegister,
  userLogin,
  editProfile,
  showProfile,
  showPosts,
};

const PostServices = {
  addPost,
};
module.exports = {
  UserServices,
  PostServices,
};
