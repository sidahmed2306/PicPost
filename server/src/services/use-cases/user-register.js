const { User } = require("../../models");
const crypto = require("crypto");
const { createRandomSalt, createHash } = require("../utilis/createHash");
const { sendVerficationMail } = require("../utilis/send-verficationMail");

async function userRegister({
  firstName,
  lastName,
  userName,
  birthDate,
  email,
  password,
  telNumber,
  gender,
  bio,
  profilPicture,
}) {
  console.log("email:", email);
  const foundUser = await User.findOne({ email }).exec();
  if (foundUser) {
    throw new Error("this Email have already acount");
  }
  const passwordSalt = createRandomSalt();
  const passwordhash = createHash(`${password}${passwordSalt}`);
  const randomVerificationCode = crypto
    .randomInt(0, 999999)
    .toString()
    .padStart(6, "0");
  const newUser = await User.create({
    firstName,
    lastName,
    userName,
    birthDate,
    verificationCode: randomVerificationCode,

    email,
    passwordhash,
    passwordSalt,
    telNumber,
    gender,
    bio,
    profilPicture,
  });
  const message = `
  <p>Hi ${newUser.firstName}!</p>
  <p>Here is your verfication code:${newUser.verificationCode}</p>

  <p>Yours,</p>
 <p>Picpost Team</p>
`;

  const sent = await sendVerficationMail({
    to: newUser.email,
    subject: "Account verification",
    message,
  });
  if (!sent) {
    throw new Error("Could not send email, please try again later");
  }

  return {
    _id: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    userName: newUser.userName,
    birthDate: newUser.birthDate,
    email: newUser.email,
    telNumber: newUser.telNumber,
    gender: newUser.gender,
    bio: newUser.bio,
  };
}
module.exports = {
  userRegister,
};
