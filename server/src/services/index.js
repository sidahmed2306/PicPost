const { userLogin } = require("./use-cases/user-login");
const { userRegister } = require("./use-cases/user-register");

const UserServices = {
  userRegister,
  userLogin,
};
module.exports = {
  UserServices,
};
