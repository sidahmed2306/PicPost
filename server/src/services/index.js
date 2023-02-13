const { addPost } = require("./use-cases/add-post");
const { userLogin } = require("./use-cases/user-login");
const { userRegister } = require("./use-cases/user-register");
const { editProfile } = require("./use-cases/edit-profile");

const UserServices = {
  userRegister,
  userLogin,
  editProfile,
};

const PostServices = {
  addPost,
};
module.exports = {
  UserServices,
  PostServices,
};
