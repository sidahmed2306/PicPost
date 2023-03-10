const { UserServices } = require("../services");
const { fileUploadAndRemove } = require("../services/utilis/uploadDao");
const { catchErrors } = require("./catchError");
const fs = require("fs");

const postRefreshToken = catchErrors(async (req, res) => {
  const userId = req.verifiedUserClaims.sub;
  const result = await UserServices.refreshToken({ userId });
  return res.json({
    status: "ok",
    result,
  });
});

const postRegister = catchErrors(async (req, res) => {
  // const uploader = async (path) => await fileUpload(path, "Images");
  // const file = req.files[0];
  // const { path } = file;
  // const newPath = await uploader(path);

  // fs.unlink(path, (err) => {
  //   console.log(err);
  // });

  const userInfos = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    birthDate: req.body.birthDate,
    email: req.body.email,
    password: req.body.password,
    telNumber: req.body.telNumber,
    gender: req.body.gender,
    bio: req.body.bio,
    // profilPicture,
  };

  const newUser = await UserServices.userRegister(userInfos);
  return res.json({
    status: "ok",
    newUser,
  });
});

const postLogin = catchErrors(async (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };
  const { accessToken, refreshToken } = await UserServices.userLogin(
    credentials
  );

  if (refreshToken) {
    req.session.refreshToken = refreshToken;
  }
  return res.json({
    status: "ok",
    result: { accessToken, refreshToken },
  });
});

const postForgotPassword = catchErrors(async (req, res) => {
  const email = req.body.email;
  const result = await UserServices.forgotPassword({ email });
  return res.json({
    status: "ok",
    result,
  });
});

const postResetPassword = catchErrors(async (req, res) => {
  const userId = req.verifiedUserClaims.sub;
  const password = req.body.password;
  const result = await UserServices.resetPassword({ userId, password });
  return res.json({
    status: "ok",
    result,
  });
});

const verficationCode = catchErrors(async (req, res) => {
  const verficationCode = req.body.verificationCode;

  const result = await UserServices.userVerification(verficationCode);

  return res.json({
    status: "ok",
    result,
  });
});

const getShowProfile = catchErrors(async (req, res) => {
  const userId = req.verifiedUserClaims.sub;
  const result = await UserServices.showProfile({ userId });
  return res.json({
    status: "ok",
    result,
  });
});

const getShowProfileDetail = catchErrors(async (req, res) => {
  const userId = req.params.id;
  profileId = req.verifiedUserClaims.sub;
  const result = await UserServices.showProfileDetail({ userId, profileId });
  return res.json({
    status: "ok",
    result,
  });
});

const postAddfollowers = catchErrors(async (req, res) => {
  const idUser = req.verifiedUserClaims.sub;
  const idfollwer = req.body.id;
  console.log(idUser);
  console.log(idfollwer);

  const result = await UserServices.addfollowers({ idUser, idfollwer });
  return res.json({
    status: "ok",
    result,
  });
});

const getShowPost = catchErrors(async (req, res) => {
  const idUser = req.verifiedUserClaims.sub;
  const result = await UserServices.showPosts(idUser);
  return res.json({
    status: "ok",
    result,
  });
});

const getShowUser = catchErrors(async (req, res) => {
  const idUser = req.verifiedUserClaims.sub;
  const profileId = req.body.id;
  const result = await UserServices.showUsers({ idUser, profileId });
  return res.json({
    status: "ok",
    result,
  });
});

const putEditProfile = catchErrors(async (req, res) => {
  const userId = req.verifiedUserClaims.sub;

  const updateInfo = {
    userId,
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    bio: req.body.bio,
    link: req.body.link,
    job: req.body.job,
    telNumber: req.body.telNumber,
  };
  const file = req.files[0];
  if (file) {
    const uploader = async (path) => await fileUploadAndRemove(path, "Images");
    const newPath = await uploader(file.path);
    updateInfo.profilePicture = newPath;
  }
  const result = await UserServices.editProfile(updateInfo);
  return res.json({
    status: "ok",
    result,
  });
});

module.exports = {
  postRegister,
  postLogin,
  putEditProfile,
  getShowProfile,
  getShowPost,
  getShowUser,
  getShowProfileDetail,
  postRefreshToken,
  postAddfollowers,
  postForgotPassword,
  postResetPassword,
  verficationCode,
};
