const AdminUser = require("../modules/models/userModel/adminUser.model");

const requireUserAndPermission = (permission) => {
    return async (req, res, next) => {
        try {
         
            const userId = req.headers["user-id"];
            console.log(userId);

            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const admin = await AdminUser.findById(userId).populate("type");
            if (!admin) {
                return res.status(401).json({ message: "Invalid user" });
            }

            // attach admin to request
            req.user = admin;

            if (admin?.type?.admin_type === "super_admin" || (admin?.type?.permissions && admin?.type?.permissions.includes("all"))) {
                // console.log("=====");
               return next();
            }
            // if permission is provided, check it
            if (permission) {
                const permissions = admin?.type?.permissions || [];

                if (!permissions.includes(permission)) {
                    return res.status(403).json({ message: "Forbidden" });
                }
            }

          return  next();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Auth error" });
        }
    };
};

module.exports = requireUserAndPermission;
