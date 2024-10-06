const userLogout = async (req, res) => {

    try {
        res.clearCookie("authToken");
        res.status(200).json({ success: true, message: "User Logout Successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = userLogout;
