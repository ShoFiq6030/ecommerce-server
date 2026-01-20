const express = require("express");
const router = express.Router();
const {
    getOrCreateSession,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCart,
    clearCart,
} = require("../controllers/cart.controller");
const requireUser = require("../../middleware/isAuthorizedUser");

// Cart routes for regular users
router.get("/", requireUser(), getCart);
router.post("/", requireUser(), addToCart);
router.put("/:productId", requireUser(), updateCartItem);
router.delete("/:productId", requireUser(), removeFromCart);
router.delete("/", requireUser(), clearCart);

// Session route (optional - can be used to check/create session)
router.get("/session", requireUser(), getOrCreateSession);

module.exports = router;
