const UserModel = require("../../Models/UserSchema/userSchema");
const bcrypt = require("bcrypt");
const { sendResetPasswordSuccessEmail } = require("../../config/mailTrap/emails");

const userResetPassword = async (req, res) => {

    try {

        const { token } = req.params;
        const { password } = req.body;

        const user = await UserModel.findOne({
            ressetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            res.status(400).send({ success: false, message: "Token has expired or is invalid" })
        }

        //update password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.ressetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        //send reset password success email
        await sendResetPasswordSuccessEmail(user.email);

        res.status(200).send({ success: true, message: "Password reset successfully" })

    } catch (error) {
        res.status(500).send({ success: false, message: `Internal server error. ${error.message}` })
    }
}

module.exports = userResetPassword;