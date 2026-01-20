const {
    getOrCreateSessionService,
    addToCartService,
    updateCartItemService,
    removeFromCartService,
    getCartService,
    clearCartService,
} = require("../services/cart.service");

// Get or create shopping session
const getOrCreateSession = async (req, res) => {
    try {
        const userId = req.user._id;
        const sessionResponse = await getOrCreateSessionService(userId);

        if (!sessionResponse.success) {
            return res.status(400).json({ ...sessionResponse });
        }

        res.status(200).json({ ...sessionResponse });
    } catch (error) {
        console.error("Error in getOrCreateSession:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity, size, color } = req.body;

        // Validate required fields
        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: productId and quantity are required",
            });
        }

        if (typeof quantity !== "number" || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a number greater than 0",
            });
        }

        const cartResponse = await addToCartService(userId, productId, quantity, size, color);

        if (!cartResponse.success) {
            return res.status(400).json({ ...cartResponse });
        }

        res.status(201).json({ ...cartResponse });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        const { quantity, size, color } = req.body;

        // Validate required fields
        if (quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required field: quantity is required",
            });
        }

        if (typeof quantity !== "number" || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a number greater than or equal to 0",
            });
        }

        const cartResponse = await updateCartItemService(userId, productId, quantity, size, color);

        if (!cartResponse.success) {
            return res.status(400).json({ ...cartResponse });
        }

        res.status(200).json({ ...cartResponse });
    } catch (error) {
        console.error("Error in updateCartItem:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        let size, color;
        if (req.body) {
            ({ size, color } = req.body);
        }


        const cartResponse = await removeFromCartService(userId, productId, size, color);

        if (!cartResponse.success) {
            return res.status(404).json({ ...cartResponse });
        }

        res.status(200).json({ ...cartResponse });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get user's cart
const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cartResponse = await getCartService(userId);

        if (!cartResponse.success) {
            return res.status(400).json({ ...cartResponse });
        }

        res.status(200).json({ ...cartResponse });
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cartResponse = await clearCartService(userId);

        if (!cartResponse.success) {
            return res.status(400).json({ ...cartResponse });
        }

        res.status(200).json({ ...cartResponse });
    } catch (error) {
        console.error("Error in clearCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getOrCreateSession,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCart,
    clearCart,
};
