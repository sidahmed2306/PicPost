const express = require("express");
const { postController } = require("../controllers");
const { makeAuthMiddleware } = require("../middleware/doAuth");
const multer = require("multer");
const postRouter = express.Router();

postRouter.post(
  "/",
  makeAuthMiddleware({ tokenType: "access" }),
  multer({ dest: "postImages" }).single("postPicture"),
  postController.addPost
);
module.exports = postRouter;
