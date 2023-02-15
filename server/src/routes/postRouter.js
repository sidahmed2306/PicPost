const express = require("express");
const { postController } = require("../controllers");
const { makeAuthMiddleware } = require("../middleware/doAuth");
const multer = require("multer");
const { upload } = require("../middleware/imgMulter");
const postRouter = express.Router();

postRouter.post(
  "/add-post",
  makeAuthMiddleware({ tokenType: "access" }),
  upload.array("postPicture"),
  postController.addPost
);
module.exports = postRouter;
