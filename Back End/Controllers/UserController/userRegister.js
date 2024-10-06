const UserModel = require('../../Models/UserSchema/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const getGenerateTokenAndCookies = require('../../Utils/getGenerateTokenAndCookies');
const { sendVerificationEmail } = require('../../config/mailTrap/emails');

const userRegister = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw createError(400, "Please provide all the required fields");
        }

        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            throw createError(403, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const generateVerificationToken = await (Math.floor(100000 + Math.random() * 900000)); // Generate a random 6-digit verification code

        const newUser = new UserModel({
            email,
            password: hashedPassword,
            name,
            varificationToken: generateVerificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 3600000    // 24 hours
        });
        await newUser.save();

        getGenerateTokenAndCookies(res, newUser._id);

        await sendVerificationEmail(newUser.email, newUser.varificationToken);

        res.status(200).send({
            success: true,
            message: "User registered successfully",
            user: {
                ...newUser._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

module.exports = userRegister;
