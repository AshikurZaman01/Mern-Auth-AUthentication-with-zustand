const UserModel = require("../../Models/UserSchema/userSchema");

const chechAuth = async (req, res, next) => {

    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        res.status(200).send({
            success: true,
            message: "User is authenticated",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

}
module.exports = chechAuth;