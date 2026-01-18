const ProductCategory = require("../models/productModel/productCategory.model");

const Product = require("../models/productModel/product.model");

// Create category service
const createCategoryService = async (categoryData) => {
    try {
        let { name, desc } = categoryData
        name = name.toLowerCase()

        // Check if category already exists
        const existingCategory = await ProductCategory.findOne({ name });
        if (existingCategory) {
            return { success: false, message: "Category already exists" };
        }

        // Create new category
        const newCategory = new ProductCategory({
            name,
            desc,
        });

        await newCategory.save();

        return {
            success: true,
            message: "Category created successfully",
            category: newCategory,
        };
    } catch (error) {
        console.error("Error in createCategoryService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Get all categories service
const getAllCategoriesService = async () => {
    try {
        const categories = await ProductCategory.find({ deletedAt: null })
            // .populate("products")
            .sort({ createdAt: -1 });

        return {
            success: true,
            message: "Categories retrieved successfully",
            categories,
        };
    } catch (error) {
        console.error("Error in getAllCategoriesService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Get category by ID service
const getCategoryByIdService = async (id) => {
    try {
        const category = await ProductCategory.findById(id)
        // .populate("products");

        if (!category) {
            return { success: false, message: "Category not found" };
        }

        return {
            success: true,
            message: "Category retrieved successfully",
            category,
        };
    } catch (error) {
        console.error("Error in getCategoryByIdService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Update category service
const updateCategoryService = async (id, updateData) => {
    try {
        const { name, desc } = updateData;

        const category = await ProductCategory.findById(id);
        if (!category) {
            return { success: false, message: "Category not found" };
        }

        // Check if new name already exists (excluding current category)
        if (name && name !== category.name) {
            const existingCategory = await ProductCategory.findOne({ name });
            if (existingCategory) {
                return { success: false, message: "Category name already exists" };
            }
            category.name = name;
        }

        if (desc !== undefined) {
            category.desc = desc;
        }

        await category.save();

        return {
            success: true,
            message: "Category updated successfully",
            category,
        };
    } catch (error) {
        console.error("Error in updateCategoryService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Delete category service (soft delete)
const deleteCategoryService = async (id) => {
    try {
        const category = await ProductCategory.findById(id);

        if (!category) {
            return { success: false, message: "Category not found" };
        }

        // Check if category is already deleted
        if (category.deletedAt) {
            return { success: false, message: "Category is already deleted" };
        }

        // Check if any products are associated with this category
        const productExists = await Product.exists({ categoryId: id, deletedAt: null })

        if (productExists) {
            return {
                success: false,
                message: "Cannot delete category because it has associated products",
            };
        }

        category.deletedAt = new Date();
        await category.save();

        return { success: true, message: "Category deleted successfully" };
    } catch (error) {
        console.error("Error in deleteCategoryService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};


module.exports = {
    createCategoryService,
    getAllCategoriesService,
    getCategoryByIdService,
    updateCategoryService,
    deleteCategoryService,
};
