const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: "Please Enter a valid Email"
        }
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [5, "Password must be at least 5 characters"],
    },
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    image: {
        type: String,
        default: "https://avatar.iran.liara.run/public/45"
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    ressetPasswordToken: String,
    resetPasswordExpiresAt: Date,

    varificationToken: String,
    verificationTokenExpiresAt: Date,


}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;