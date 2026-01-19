const Product = require("../models/productModel/product.model");
const ProductCategory = require("../models/productModel/productCategory.model");
const Discount = require("../models/productModel/discount.model");


// Create product service
const createProductService = async (productData) => {
    try {
        const {
            name,
            desc,
            sku,
            price,
            images,
            categoryId,
            inventoryCount,
            size,
            color,
            weight,
            discountId,
        } = productData;

        // Validate required fields
        if (!name || !sku || !price || !categoryId || inventoryCount === undefined) {
            return {
                success: false,
                message: "Missing required fields: name, sku, price, categoryId, and inventoryCount are required",
            };
        }

        // Check if SKU already exists
        const existingProduct = await Product.findOne({ sku });
        if (existingProduct) {
            return { success: false, message: "Product with this SKU already exists" };
        }

        // Validate category exists
        const category = await ProductCategory.findById(categoryId);
        if (!category) {
            return { success: false, message: "Category not found" };
        }

        // Validate discount exists if provided
        if (discountId) {
            const discount = await Discount.findById(discountId);
            if (!discount) {
                return { success: false, message: "Discount not found" };
            }
        }

        // Create new product
        const newProduct = new Product({
            name,
            desc,
            sku,
            price,
            images: images || [],
            categoryId,
            inventoryCount,
            size,
            color,
            weight,
            discountId: discountId || null,
        });

        await newProduct.save();

        return {
            success: true,
            message: "Product created successfully",
            product: newProduct,

        };
    } catch (error) {
        console.error("Error in createProductService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Get all products service
const getAllProductsService = async (filters = {}) => {
    try {
        const query = { deletedAt: null };

        // Apply filters
        if (filters.categoryId) {
            query.categoryId = filters.categoryId;
        }
        if (filters.discountId) {
            query.discountId = filters.discountId;
        }
        if (filters.minPrice) {
            query.price = { ...query.price, $gte: parseFloat(filters.minPrice) };
        }
        if (filters.maxPrice) {
            query.price = { ...query.price, $lte: parseFloat(filters.maxPrice) };
        }
        if (filters.search) {
            query.$or = [
                { name: { $regex: filters.search, $options: "i" } },
                { desc: { $regex: filters.search, $options: "i" } },
                { sku: { $regex: filters.search, $options: "i" } },
            ];
        }

        const products = await Product.find(query)
            .populate("categoryId", "name desc")
            .populate("discountId", "name desc discountPercent active")
            .sort({ createdAt: -1 });

        return {
            success: true,
            message: "Products retrieved successfully",
            products,
        };
    } catch (error) {
        console.error("Error in getAllProductsService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Get product by ID service
const getProductByIdService = async (id) => {
    try {
        const product = await Product.findById(id)
            .populate("categoryId", "name desc")
            .populate("discountId", "name desc discountPercent active");

        if (!product) {
            return { success: false, message: "Product not found" };
        }

        return {
            success: true,
            message: "Product retrieved successfully",
            product,
        };
    } catch (error) {
        console.error("Error in getProductByIdService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Update product service
const updateProductService = async (id, updateData) => {
    try {
        const {
            name,
            desc,
            sku,
            price,
            images,
            categoryId,
            inventoryCount,
            size,
            color,
            weight,
            discountId,
        } = updateData;

        const product = await Product.findById(id);
        if (!product) {
            return { success: false, message: "Product not found" };
        }

        // Check if SKU is being changed and already exists
        if (sku && sku !== product.sku) {
            const existingProduct = await Product.findOne({ sku });
            if (existingProduct) {
                return { success: false, message: "Product with this SKU already exists" };
            }
            product.sku = sku;
        }

        // Validate category if being changed
        if (categoryId && categoryId !== product.categoryId.toString()) {
            const category = await ProductCategory.findById(categoryId);
            if (!category) {
                return { success: false, message: "Category not found" };
            }
            product.categoryId = categoryId;
        }

        // Validate discount if being changed
        if (discountId !== undefined) {
            if (discountId) {
                const discount = await Discount.findById(discountId);
                if (!discount) {
                    return { success: false, message: "Discount not found" };
                }
            }
            product.discountId = discountId || null;
        }

        // Update fields
        if (name) product.name = name;
        if (desc !== undefined) product.desc = desc;
        if (price !== undefined) product.price = price;
        if (images !== undefined) product.images = images;
        if (inventoryCount !== undefined) product.inventoryCount = inventoryCount;
        if (size !== undefined) product.size = size;
        if (color !== undefined) product.color = color;
        if (weight !== undefined) product.weight = weight;

        await product.save();

        return {
            success: true,
            message: "Product updated successfully",
            product,
        };
    } catch (error) {
        console.error("Error in updateProductService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Delete product service (soft delete)
const deleteProductService = async (id) => {
    try {
        const product = await Product.findById(id);

        if (!product) {
            return { success: false, message: "Product not found" };
        }

        // Check if product is already deleted
        if (product.deletedAt) {
            return { success: false, message: "Product is already deleted" };
        }

        product.deletedAt = new Date();
        await product.save();

        return { success: true, message: "Product deleted successfully" };
    } catch (error) {
        console.error("Error in deleteProductService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Get products by category service
const getProductsByCategoryService = async (categoryId) => {
    try {
        // Validate category exists
        const category = await ProductCategory.findById(categoryId);
        if (!category) {
            return { success: false, message: "Category not found" };
        }

        const products = await Product.find({ categoryId, deletedAt: null })
            .populate("categoryId", "name desc")
            .populate("discountId", "name desc discountPercent active")
            .sort({ createdAt: -1 });

        return {
            success: true,
            message: "Products retrieved successfully",
            category,
            products,
        };
    } catch (error) {
        console.error("Error in getProductsByCategoryService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Update product inventory count service
const updateProductInventoryCountService = async (id, newInventoryCount) => {
    try {
        const product = await Product.findById(id);

        if (!product) {
            return { success: false, message: "Product not found" };
        }

        if (newInventoryCount < 0) {
            return { success: false, message: "Inventory count cannot be negative" };
        }

        product.inventoryCount = newInventoryCount;
        await product.save();

        return {
            success: true,
            message: "Product inventory count updated successfully",
            product,
        };
    } catch (error) {
        console.error("Error in updateProductInventoryCountService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

// Get products with discount service
const getProductsWithDiscountService = async () => {
    try {
        const products = await Product.find({ deletedAt: null, discountId: { $ne: null } })
            .populate("categoryId", "name desc")
            .populate("discountId", "name desc discountPercent active")
            .sort({ createdAt: -1 });

        return {
            success: true,
            message: "Products with discount retrieved successfully",
            products,
        };
    } catch (error) {
        console.error("Error in getProductsWithDiscountService:", error);
        return {
            success: false,
            message: error.message || "Internal server error",
        };
    }
};

module.exports = {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
    getProductsByCategoryService,
    updateProductInventoryCountService,
    getProductsWithDiscountService,
};
