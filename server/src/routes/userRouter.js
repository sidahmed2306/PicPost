const multer = require("multer");
const express = require("express");
const { userController } = require("../controllers");
const { validate } = require("../middleware/validate");
const { makeAuthMiddleware } = require("../middleware/doAuth");
const { UserValidations } = require("../validations");
const { upload } = require("../middleware/imgMulter");

const userRouter = express.Router();

userRouter.post(
  "/register",
  validate(UserValidations.registerUserValidation.body),
  userController.postRegister
);

userRouter.post(
  "/login",
  validate(UserValidations.loginUserValidation.body),
  userController.postLogin
);

userRouter.get(
  "/profile",
  makeAuthMiddleware({ tokenType: "access" }),
  userController.getShowProfile
);
userRouter.get(
  "/all-users",
  makeAuthMiddleware({ tokenType: "access" }),
  userController.getShowUser
);

userRouter.get(
  "/home",
  makeAuthMiddleware({ tokenType: "access" }),
  userController.getShowPost
);

userRouter.put(
  "/profile",
  makeAuthMiddleware({ tokenType: "access" }),
  upload.array("profilePicture"),
  userController.putEditProfile
);

module.exports = userRouter;
