const { User } = require("../../models");
const { createRandomSalt, createHash } = require("../utilis/createHash");

async function resetPassword({ userId, password }) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User was removed");
  }

  const passwordSalt = createRandomSalt();
  const passwordHash = createHash(`${password}${passwordSalt}`);
  user.passwordhash = passwordHash;
  user.passwordSalt = passwordSalt;

  await user.save();

  return {};
}

module.exports = {
  resetPassword,
};
