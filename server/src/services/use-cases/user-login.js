const { User } = require("../../models");
const { createHash } = require("../utilis/createHash");
const { createToken } = require("../utilis/createToken");

async function userLogin({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user not found");
  }

  const passwordhash = user.passwordhash;
  const passwordSalt = user.passwordSalt;
  const validPassword =
    createHash(`${password}${passwordSalt}`) === passwordhash;
  if (!validPassword) {
    throw new Error("email or password false");
  }
  const accessToken = createToken(user, "access");

  const refreshToken = createToken(user, "refresh");

  return { accessToken, refreshToken };
}

module.exports = {
  userLogin,
};
