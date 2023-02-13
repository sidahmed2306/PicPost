const multer = require("multer");
const express = require("express");
const { userController } = require("../controllers");
const { validate } = require("../middleware/validate");
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

module.exports = userRouter;
