const createError = require("http-errors");
const UserModel = require("../../Models/UserSchema/userSchema");
const { sendWelcomeEmail } = require("../../config/mailTrap/emails");

const verifyUserEmail = async (req, res) => {

    const { code } = req.body;

    try {


        const user = await UserModel.findOne({
            varificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            throw createError.BadRequest({ success: false, message: 'Invalid or expired verification code' });
        }

        user.isVerified = true;

        user.varificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: 'User verified successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

module.exports = verifyUserEmail;