const User = require("../models/userModel/user.model");
const AdminUser = require("../models/userModel/adminUser");
const bcrypt = require("bcrypt");
const { userSignupService, userSigninService, adminSignupService, adminSigninService } = require("../services/auth.service");

// User signup controller
const userSignup = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userSignupService(userData)
        // console.log(newUser);

        if (userData.success === false) {
            return res.status(400).json({ ...newUser });
        }

        res.status(201).json({ ...newUser });
    } catch (error) {
        console.error("Error in userSignup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// User signin controller
const userSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userResponse = await userSigninService(email, password)

        if (!userResponse.success) {
            return res.status(400).json({ ...userResponse });
        }

        res.status(200).json({
            ...userResponse,
        });
    } catch (error) {
        console.error("Error in userSignin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Admin user signup controller
const adminSignup = async (req, res) => {
    try {

        const newAdmin = await adminSignupService(req.body)

        if (!newAdmin.success) {
            return res.status(400).json({ ...newAdmin });
        }

        res.status(201).json({ ...newAdmin });
    } catch (error) {
        console.error("Error in adminSignup:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Admin user signin controller
const adminSignin = async (req, res) => {
    try {

        const { email, password } = req.body
        const adminResponse = await adminSigninService(email, password)

        if (!adminResponse.success) {
            return res.status(400).json({ ...adminResponse });
        }

        res.status(200).json({ ...adminResponse });
    } catch (error) {
        console.error("Error in adminSignin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    userSignup,
    userSignin,
    adminSignup,
    adminSignin,
};
