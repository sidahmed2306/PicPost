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

postRouter.post(
  "/add-comment/:id",
  makeAuthMiddleware({ tokenType: "access" }),
  postController.postAddComment
);
postRouter.put(
  "/edit-post",
  makeAuthMiddleware({ tokenType: "access" }),
  postController.putEditPost
);

postRouter.post(
  "/delete-post",
  makeAuthMiddleware({ tokenType: "access" }),
  postController.postdeletePost
);

postRouter.post(
  "/add-like",
  makeAuthMiddleware({ tokenType: "access" }),
  postController.postAddLike
);

postRouter.get(
  "/add-comment/:id",
  makeAuthMiddleware({ tokenType: "access" }),
  postController.getShowPostDetail
);

module.exports = postRouter;
