const express = require("express");
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require("../controllers/category.controller");
const requireUserAndPermission = require("../middleware/isAuthorized");

// Category routes
router.post("/",requireUserAndPermission("create-category"), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id",requireUserAndPermission("update-category"),updateCategory);
router.delete("/:id",requireUserAndPermission("delete-category"), deleteCategory);

module.exports = router;
