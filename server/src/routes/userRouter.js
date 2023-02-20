const multer = require("multer");
const express = require("express");
const { userController } = require("../controllers");
const { validate } = require("../middleware/validate");
const { makeAuthMiddleware } = require("../middleware/doAuth");
const { UserValidations } = require("../validations");
const { upload } = require("../middleware/imgMulter");

const userRouter = express.Router();

userRouter.post(
  "/refresh-token",
  makeAuthMiddleware({ tokenType: "refresh" }),
  userController.postRefreshToken
);

userRouter.post(
  "/add-follwer",
  makeAuthMiddleware({ tokenType: "access" }),
  userController.postAddfollowers
);

userRouter.post(
  "/register",
  validate(UserValidations.registerUserValidation.body),
  userController.postRegister
);

userRouter.post(
  "/acount-verfication",

  userController.verficationCode
);

userRouter.post(
  "/login",
  validate(UserValidations.loginUserValidation.body),
  userController.postLogin
);

userRouter.post("/forgot-password", userController.postForgotPassword);

userRouter.post(
  "/reset-password",
  makeAuthMiddleware({ tokenType: "password-reset" }),
  userController.postResetPassword
);

userRouter.post("/logout", (req, res) => {
  req.session.refreshToken = null; // delete refresh token
  res.json({ status: "ok", result: {} });
});

userRouter.get(
  "/profile",
  makeAuthMiddleware({ tokenType: "access" }),
  userController.getShowProfile
);
userRouter.get(
  "/profile-detail/:id",
  makeAuthMiddleware({ tokenType: "access" }),
  userController.getShowProfileDetail
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
