const User = require("../modules/models/userModel/user.model");
const AdminUser = require("../modules/models/userModel/adminUser.model");

const requireUser = (permission) => {
    return async (req, res, next) => {
        try {

            const userId = req.headers["user-id"];
            console.log(userId);

            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(401).json({ message: "Invalid user" });
            }
            if (user._id.toString() !== userId.toString()) {
                return res.status(403).json({ message: "Forbidden" });
            }

            // attach user to request
            req.user = user;

            return next();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Auth error" });
        }
    };
};

module.exports = requireUser;

