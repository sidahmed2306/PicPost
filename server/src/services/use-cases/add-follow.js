const { User } = require("../../models");

async function addfollowers({ idUser, idfollwer }) {
  console.log("idBackend", idUser);
  console.log("idBackend", idfollwer);
  try {
    const userfollowed = await User.findById(idfollwer);
    const user = await User.findById(idUser);
    if (!userfollowed) {
      throw new Error("Post not found");
    }
    const index = userfollowed.followers.findIndex(
      (i) => i.toString() === idUser.toString()
    );
    if (index === -1) {
      userfollowed.followers.push(idUser);
      await userfollowed.save();

      user.following.push(idfollwer);
      await user.save();

      return { userfollowed, user };
    } else {
      userfollowed.followers.splice(index, 1);
      await userfollowed.save();

      user.following.splice(index, 1);
      await user.save();

      return { userfollowed, user };
    }
  } catch (err) {
    throw new Error(`Could not add comment: ${err.message}`);
  }
}

module.exports = {
  addfollowers,
};
