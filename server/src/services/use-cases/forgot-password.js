const { User } = require("../../models");
const { createToken } = require("../utilis/createToken");
const { sendMail } = require("../utilis/sendMail");

async function forgotPassword({ email }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(
      "Seems like you don't have an account yet, you may register"
    );
  }

  const passwordResetToken = createToken(user, "password-reset");
  const passwordResetLink = `${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}`;

  const message = `
    <p>Hi ${user.firstName}!</p>

    <p>Here is your requested Link: <a href="${passwordResetLink}">Reset password</a></p>

   <p> Yours,</p>
   <p>Picpost Team</p>
  `;

  const sent = await sendMail({
    to: user.email,
    subject: "Password Reset Link",
    message,
  });
  if (!sent) {
    throw new Error("Could not send email, please try again later");
  }

  return {};
}

module.exports = {
  forgotPassword,
};

/*

Steps:
1. forgot password im Frontend ---> /forgot-password --> send Email with link (+ token)
2. Click on Link --> Frotnend --> Form mit new password, confirm new password --> /reset-password mit new password + token -->
3. Login

*/
