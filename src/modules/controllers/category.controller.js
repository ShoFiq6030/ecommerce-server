const {
    createCategoryService,
    getAllCategoriesService,
    getCategoryByIdService,
    updateCategoryService,
    deleteCategoryService,
} = require("../services/category.service");

// Create category controller
const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await createCategoryService(categoryData);

        if (!newCategory.success) {
            return res.status(400).json({ ...newCategory });
        }

        res.status(201).json({ ...newCategory });
    } catch (error) {
        console.error("Error in createCategory:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all categories controller
const getAllCategories = async (req, res) => {
    try {
        const categoriesResponse = await getAllCategoriesService();

        if (!categoriesResponse.success) {
            return res.status(400).json({ ...categoriesResponse });
        }

        res.status(200).json({ ...categoriesResponse });
    } catch (error) {
        console.error("Error in getAllCategories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get category by ID controller
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryResponse = await getCategoryByIdService(id);

        if (!categoryResponse.success) {
            return res.status(404).json({ ...categoryResponse });
        }

        res.status(200).json({ ...categoryResponse });
    } catch (error) {
        console.error("Error in getCategoryById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update category controller
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const categoryResponse = await updateCategoryService(id, updateData);

        if (!categoryResponse.success) {
            return res.status(400).json({ ...categoryResponse });
        }

        res.status(200).json({ ...categoryResponse });
    } catch (error) {
        console.error("Error in updateCategory:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete category controller
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryResponse = await deleteCategoryService(id);

        if (!categoryResponse.success) {
            return res.status(404).json({ ...categoryResponse });
        }

        res.status(200).json({ ...categoryResponse });
    } catch (error) {
        console.error("Error in deleteCategory:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
