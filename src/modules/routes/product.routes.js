const express = require("express");
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    updateProductInventoryCount,
    getProductsWithDiscount,
} = require("../controllers/product.controller");
const requireUserAndPermission = require("../../middleware/isAuthorizedAdmin");

// Product routes
router.post("/", requireUserAndPermission("create-product"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", requireUserAndPermission("update-product"), updateProduct);
router.delete("/:id", requireUserAndPermission("delete-product"), deleteProduct);

// Additional product routes
router.get("/category/:categoryId", getProductsByCategory);
router.patch("/:id/inventory", requireUserAndPermission("update-product"), updateProductInventoryCount);
router.get("/discount/active", getProductsWithDiscount);

module.exports = router;
