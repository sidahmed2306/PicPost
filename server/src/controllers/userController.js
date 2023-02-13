const { UserServices } = require("../services");
const { catchErrors } = require("./catchError");

const postRegister = catchErrors(async (req, res) => {
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
    profilPicture: req.body.profilPicture,
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

const putEditProfile = catchErrors(async (req, res) => {
  const userId = req.verifiedUserClaims.sub;

  console.log(req.body, req.file);
  const updateInfo = {
    userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    bio: req.body.bio,
    link: req.body.link,
    job: req.body.job,
    profilePicture: req.file?.filename,
  };

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
};
