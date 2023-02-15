const { User } = require("../../models");

async function editProfile({
  userId,
  firstName,
  lastName,
  email,
  bio,
  profilePicture,
  job,
  link,
  telNumber,
  userName,
  birthDate,
}) {
  console.log("test5", profilePicture);
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        firstName,
        lastName,
        email,
        bio,
        profilePicture,
        job,
        link,
        telNumber,
        userName,
        birthDate,
      },
    },
    { new: true }
  ).exec();
  console.log("user", user);
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture,
    job: user.job,
    link: user.link,
    telNumber: user.telNumber,
    userName: user.userName,
    birthDate: user.birthDate,
  };
}

module.exports = {
  editProfile,
};
