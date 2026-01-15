const User = require("../models/userModel/user.model");
const AdminUser = require("../models/userModel/adminUser");
const AdminType = require("../models/userModel/adminType.model");
const bcrypt = require("bcrypt");

// User signup service
const userSignupService = async (userData) => {
    try {
        const { email, password, first_name, last_name, telephone } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, message: "user already exists" };
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            telephone,
        });

        await newUser.save();

        console.log(newUser);

        // Return user data without password
        const userResponse = {
            ...newUser._doc
        };

        return {
            success: true,
            message: "User created successfully",
            user: userResponse,
        };
    } catch (error) {
        console.error("Error in userSignupService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// User signin service
const userSigninService = async (email, password) => {
    try {
        // Find user by username and include password in the result
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid credentials" }

        }

        // Return user data without password
        const userResponse = {
            ...user._doc
        };

        return {
            success: true,
            message: "User signed in successfully",
            user: userResponse,
        };
    } catch (error) {
        console.error("Error in userSigninService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Admin user signup service
const adminSignupService = async (adminData) => {
    try {
        const { email, password, first_name, last_name, type_id } = adminData;

        // Check if admin user already exists
        const existingAdmin = await AdminUser.findOne({ email });
        if (existingAdmin) {
            return { success: false, message: "admin already exists" }
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new admin user
        const newAdmin = new AdminUser({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            type_id,
        });

        await newAdmin.save();

        // Populate the admin type
        await newAdmin.populate("type_id");

        // Return admin data without password
        const adminResponse = {
            ...newAdmin._doc
        };

        return {
            success: true,
            message: "Admin user created successfully",
            admin: adminResponse,
        };
    } catch (error) {
        console.error("Error in adminSignupService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Admin user signin service
const adminSigninService = async (email, password) => {
    try {
        // Find admin user by username and include password in the result
        const admin = await AdminUser.findOne({ email }).select("+password");
        if (!admin) {
            return { success: false, message: "admin not found" }
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {

            return { success: false, message: "Invalid credentials" }

        }

        // Update last login
        admin.last_login = new Date();
        await admin.save();

        // Populate the admin type
        await admin.populate("type_id");

        // Return admin data without password
        const adminResponse = {
            ...admin._doc
        };

        return {
            success: true,
            message: "Admin user signed in successfully",
            admin: adminResponse,
        };
    } catch (error) {
        console.error("Error in adminSigninService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

module.exports = {
    userSignupService,
    userSigninService,
    adminSignupService,
    adminSigninService,
};
