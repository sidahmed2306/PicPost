const { User } = require("../../models");

async function editProfile({
  userId,
  firstName,
  lastName,
  email,
  bio,
  profilePicture,
}) {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: { firstName, lastName, email, bio, profilePicture },
    },
    { new: true }
  ).exec();

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture,
    bio: user.bio,
  };
}

module.exports = {
  editProfile,
};
