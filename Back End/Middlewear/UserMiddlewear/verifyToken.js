const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ success: false, message: "You are not authenticated. Please login first" });

    try {

        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        if (!decoded) return res.status(401).json({ success: false, message: "You are not authenticated. Please login first" });

        req.userId = decoded.userId;

        next();

    } catch (error) {
        res.status(401).json({ success: false, message: "You are not authenticated. Please login first" });
    }

}

module.exports = { verifyToken };