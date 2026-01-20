const ShoppingSession = require("../models/orderModel/shoppingSession.model");
const CartItem = require("../models/orderModel/cartItem.model");
const Product = require("../models/productModel/product.model");

// Get or create shopping session for user
const getOrCreateSessionService = async (userId) => {
    try {
        let session = await ShoppingSession.findOne({
            userId,
            status: "active"
        }).populate({
            path: "items",
            select: "productId quantity size color unitPrice",
            populate: {
                path: "productId",
                select: "name price images inventoryCount"
            }
        });

        if (!session) {
            session = new ShoppingSession({ userId, total: 0, status: "active" });
            await session.save();
        }

        return {
            success: true,
            message: "Session retrieved successfully",
            session,
        };
    } catch (error) {
        console.error("Error in getOrCreateSessionService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Add item to cart
const addToCartService = async (userId, productId, quantity, size = null, color = null) => {
    try {
        // Validate product exists and has sufficient inventory
        const product = await Product.findById(productId);
        if (!product) {
            return { success: false, message: "Product not found" };
        }

        if (product.inventoryCount < quantity) {
            return {
                success: false,
                message: `Insufficient inventory. Only ${product.inventoryCount} items available`
            };
        }

        // Get or create shopping session
        const sessionResponse = await getOrCreateSessionService(userId);
        if (!sessionResponse.success) {
            return sessionResponse;
        }
        const session = sessionResponse.session;

        // Check if item already exists in cart (with same size and color)
        let existingItem = await CartItem.findOne({
            sessionId: session._id,
            productId,
            size: size || product.size,
            color: color || product.color
        });

        if (existingItem) {
            // Update quantity if item exists
            const newQuantity = existingItem.quantity + quantity;

            if (product.inventoryCount < newQuantity) {
                return {
                    success: false,
                    message: `Insufficient inventory. Only ${product.inventoryCount} items available`
                };
            }

            existingItem.quantity = newQuantity;
            existingItem.unitPrice = product.price;
            await existingItem.save();
        } else {
            // Create new cart item
            existingItem = new CartItem({
                sessionId: session._id,
                productId,
                quantity,
                size: size || null,
                color: color || null,
                unitPrice: product.price,
            });
            await existingItem.save();
        }

        // Recalculate cart total
        await recalculateCartTotal(session._id);

        // Refresh session with updated items
        const updatedSession = await ShoppingSession.findById(session._id).populate({
            path: "items",
            select: "productId quantity size color unitPrice",
            populate: {
                path: "productId",
                select: "name price images inventoryCount"
            }
        });

        return {
            success: true,
            message: "Item added to cart successfully",
            session: updatedSession,
        };
    } catch (error) {
        console.error("Error in addToCartService:", error);
        // Handle duplicate key error (already exists)
        if (error.code === 11000) {
            return {
                success: false,
                message: "Item already exists in cart. Use update quantity instead.",
            };
        }
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Update cart item quantity
const updateCartItemService = async (userId, productId, quantity, size = null, color = null) => {
    try {
        // Get user's active session
        const session = await ShoppingSession.findOne({
            userId,
            status: "active"
        });

        if (!session) {
            return { success: false, message: "Cart not found" };
        }

        // Find cart item (with size and color)
        const cartItem = await CartItem.findOne({
            sessionId: session._id,
            productId,
            size: size || null,
            color: color || null
        });

        if (!cartItem) {
            return { success: false, message: "Item not found in cart" };
        }

        // Validate product inventory
        const product = await Product.findById(productId);
        if (!product) {
            return { success: false, message: "Product not found" };
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            await CartItem.findByIdAndDelete(cartItem._id);
            await recalculateCartTotal(session._id);

            const updatedSession = await ShoppingSession.findById(session._id).populate({
                path: "items",
                populate: {
                    path: "productId",
                    select: "name price images inventoryCount"
                }
            });

            return {
                success: true,
                message: "Item removed from cart",
                session: updatedSession,
            };
        }

        if (product.inventoryCount < quantity) {
            return {
                success: false,
                message: `Insufficient inventory. Only ${product.inventoryCount} items available`
            };
        }

        // Update quantity
        cartItem.quantity = quantity;
        cartItem.unitPrice = product.price;
        await cartItem.save();

        // Recalculate cart total
        await recalculateCartTotal(session._id);

        // Refresh session with updated items
        const updatedSession = await ShoppingSession.findById(session._id).populate({
            path: "items",
            select: "productId quantity size color unitPrice",
            populate: {
                path: "productId",
                select: "name price images inventoryCount"
            }
        });

        return {
            success: true,
            message: "Cart item updated successfully",
            session: updatedSession,
        };
    } catch (error) {
        console.error("Error in updateCartItemService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Remove item from cart
const removeFromCartService = async (userId, productId, size = null, color = null) => {
    try {
        // Get user's active session
        const session = await ShoppingSession.findOne({
            userId,
            status: "active"
        });

        if (!session) {
            return { success: false, message: "Cart not found" };
        }

        // Find and remove cart item (with size and color)
        const result = await CartItem.findOneAndDelete({
            sessionId: session._id,
            productId,
            size: size || null,
            color: color || null
        });

        if (!result) {
            return { success: false, message: "Item not found in cart" };
        }

        // Recalculate cart total
        await recalculateCartTotal(session._id);

        // Refresh session with updated items
        const updatedSession = await ShoppingSession.findById(session._id).populate({
            path: "items",
            select: "productId quantity size color unitPrice",
            populate: {
                path: "productId",
                select: "name price images inventoryCount"
            }
        });

        return {
            success: true,
            message: "Item removed from cart successfully",
            session: updatedSession,
        };
    } catch (error) {
        console.error("Error in removeFromCartService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Get user's cart
const getCartService = async (userId) => {
    try {
        const session = await ShoppingSession.findOne({
            userId,
            status: "active"
        }).populate({
            path: "items",
            select: "productId quantity size color unitPrice", // Explicitly select size and color
            populate: {
                path: "productId",
                select: "name price images inventoryCount sku"
            }
        });

        if (!session) {
            return {
                success: true,
                message: "Cart retrieved successfully",
                session: { items: [], total: 0 },
            };
        }

        return {
            success: true,
            message: "Cart retrieved successfully",
            session,
        };
    } catch (error) {
        console.error("Error in getCartService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Clear cart
const clearCartService = async (userId) => {
    try {
        // Get user's active session
        const session = await ShoppingSession.findOne({
            userId,
            status: "active"
        });

        if (!session) {
            return { success: false, message: "Cart not found" };
        }

        // Delete all cart items for this session
        await CartItem.deleteMany({ sessionId: session._id });

        // Reset session total
        session.total = 0;
        await session.save();

        return {
            success: true,
            message: "Cart cleared successfully",
            session: { ...session.toObject(), items: [] },
        };
    } catch (error) {
        console.error("Error in clearCartService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Helper function to recalculate cart total
const recalculateCartTotal = async (sessionId) => {
    try {
        const items = await CartItem.find({ sessionId, deletedAt: null });

        const total = items.reduce((sum, item) => {
            return sum + (item.unitPrice * item.quantity);
        }, 0);

        await ShoppingSession.findByIdAndUpdate(sessionId, { total });
    } catch (error) {
        console.error("Error in recalculateCartTotal:", error);
        throw error;
    }
};

module.exports = {
    getOrCreateSessionService,
    addToCartService,
    updateCartItemService,
    removeFromCartService,
    getCartService,
    clearCartService,
};
