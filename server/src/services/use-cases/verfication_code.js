const { User } = require("../../models");

async function userVerification(verificationCode) {
  console.log("verification", verificationCode);
  const user = await User.findOne({ verificationCode: verificationCode });
  if (!user) {
    throw new Error("Verification code is incorrect");
  }

  user.verified = true;
  user.verificationCode = "";
  await user.save();
  return { user };
}

module.exports = {
  userVerification,
};
