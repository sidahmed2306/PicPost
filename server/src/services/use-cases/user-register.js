const { User } = require("../../models");
const { createRandomSalt, createHash } = require("../utilis/createHash");

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
  const newUser = await User.create({
    firstName,
    lastName,
    userName,
    birthDate,
    email,
    passwordhash,
    passwordSalt,
    telNumber,
    gender,
    bio,
    profilPicture,
  });
  console.log(newUser);
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
