const multer = require("multer");
const express = require("express");
const { userController } = require("../controllers");
const { validate } = require("../middleware/validate");
const { makeAuthMiddleware } = require("../middleware/doAuth");
const { UserValidations } = require("../validations");

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

userRouter.put(
  "/profile",
  makeAuthMiddleware({ tokenType: "access" }),
  multer({ dest: "imageUploads" }).single("profilePicture"),
  userController.putEditProfile
);

module.exports = userRouter;
