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
  console.log(userInfos.email, "halloo");
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
  const { accesToken, refreshToken } = await UserServices.userLogin(
    credentials
  );

  if (refreshToken) {
    req.session.refreshToken = refreshToken;
  }
  return res.json({
    status: "ok",
    result: { accesToken, refreshToken },
  });
});

module.exports = {
  postRegister,
  postLogin,
};
