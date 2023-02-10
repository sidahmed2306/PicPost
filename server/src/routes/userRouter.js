const multer = require("multer");
const express = require("express");
const { userController } = require("../controllers");

const userRouter = express.Router();
userRouter.post("/register", userController.postRegister);
userRouter.post("/login", userController.postLogin);

module.exports = userRouter;
