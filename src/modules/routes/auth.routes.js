const express = require("express");
const router = express.Router();
const {
  userSignup,
  userSignin,
  adminSignup,
  adminSignin,
} = require("../controllers/auth.controller");

// User routes
router.post("/user/signup", userSignup);
router.post("/user/signin", userSignin);

// Admin user routes
router.post("/admin/signup", adminSignup);
router.post("/admin/signin", adminSignin);

module.exports = router;
