const crypto = require("crypto");
const { sendResetPasswordEmail } = require("../../config/mailTrap/emails");
const UserModel = require("../../Models/UserSchema/userSchema");


const userForgetPassword = async (req, res) => {

    const { email } = req.body;

    try {

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // generate reset token 
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.ressetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // send reset password to email
        await sendResetPasswordEmail(user.email, `${process.env.RESSET_PASSWORD_LINK}/${resetToken}`);
        res.status(200).json({ success: true, message: "Reset password link sent to your email" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

};

module.exports = userForgetPassword;