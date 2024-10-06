const jwt = require('jsonwebtoken');


const getGenerateTokenAndCookies = (res, userId) => {

    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    })

    return token;

}
module.exports = getGenerateTokenAndCookies;