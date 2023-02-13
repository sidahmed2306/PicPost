const { addPost } = require("./use-cases/add-post");
const { userLogin } = require("./use-cases/user-login");
const { userRegister } = require("./use-cases/user-register");

const UserServices = {
  userRegister,
  userLogin,
};

const PostServices = {
  addPost,
};
module.exports = {
  UserServices,
  PostServices,
};
