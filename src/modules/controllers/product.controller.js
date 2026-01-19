const {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
    getProductsByCategoryService,
    updateProductInventoryCountService,
    getProductsWithDiscountService,
} = require("../services/product.service");

// Create product controller
const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await createProductService(productData);

        if (!newProduct.success) {
            return res.status(400).json({ ...newProduct });
        }

        res.status(201).json({ ...newProduct });
    } catch (error) {
        console.error("Error in createProduct:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all products controller
const getAllProducts = async (req, res) => {
    try {
        // Extract query parameters for filtering
        const filters = {
            categoryId: req.query.categoryId,
            discountId: req.query.discountId,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            search: req.query.search,
        };

        const productsResponse = await getAllProductsService(filters);

        if (!productsResponse.success) {
            return res.status(400).json({ ...productsResponse });
        }

        res.status(200).json({ ...productsResponse });
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get product by ID controller
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productResponse = await getProductByIdService(id);

        if (!productResponse.success) {
            return res.status(404).json({ ...productResponse });
        }

        res.status(200).json({ ...productResponse });
    } catch (error) {
        console.error("Error in getProductById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update product controller
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const productResponse = await updateProductService(id, updateData);

        if (!productResponse.success) {
            return res.status(400).json({ ...productResponse });
        }

        res.status(200).json({ ...productResponse });
    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete product controller
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productResponse = await deleteProductService(id);

        if (!productResponse.success) {
            return res.status(404).json({ ...productResponse });
        }

        res.status(200).json({ ...productResponse });
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get products by category controller
const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const productsResponse = await getProductsByCategoryService(categoryId);

        if (!productsResponse.success) {
            return res.status(404).json({ ...productsResponse });
        }

        res.status(200).json({ ...productsResponse });
    } catch (error) {
        console.error("Error in getProductsByCategory:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update product inventory count controller
const updateProductInventoryCount = async (req, res) => {
    try {
        const { id } = req.params;
        const { inventoryCount } = req.body;

        if (inventoryCount === undefined || typeof inventoryCount !== "number") {
            return res.status(400).json({
                success: false,
                message: "inventoryCount must be a number",
            });
        }

        const productResponse = await updateProductInventoryCountService(id, inventoryCount);

        if (!productResponse.success) {
            return res.status(400).json({ ...productResponse });
        }

        res.status(200).json({ ...productResponse });
    } catch (error) {
        console.error("Error in updateProductInventoryCount:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get products with discount controller
const getProductsWithDiscount = async (req, res) => {
    try {
        const productsResponse = await getProductsWithDiscountService();

        if (!productsResponse.success) {
            return res.status(400).json({ ...productsResponse });
        }

        res.status(200).json({ ...productsResponse });
    } catch (error) {
        console.error("Error in getProductsWithDiscount:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    updateProductInventoryCount,
    getProductsWithDiscount,
};
