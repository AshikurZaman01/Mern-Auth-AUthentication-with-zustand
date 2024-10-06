const UserModel = require('../../Models/UserSchema/userSchema');
const bcrypt = require('bcrypt');
const getGenerateTokenAndCookies = require('../../Utils/getGenerateTokenAndCookies');



// User login function
const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password or credentials' });
        }

        getGenerateTokenAndCookies(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                ...user._doc,
                password: undefined,
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = userLogin;
