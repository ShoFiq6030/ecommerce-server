# Product API Documentation

This document describes the product-related APIs added to the e-commerce server.

## Base URL
```
/api/v1/products
```

## API Endpoints

### 1. Create Product
**Endpoint:** `POST /api/v1/products`

**Permissions Required:** `create-product`

**Request Body:**
```json
{
  "name": "Wireless Headphones",
  "desc": "High-quality wireless headphones with noise cancellation",
  "sku": "WH-2024-BLK",
  "price": 199.99,
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "categoryId": "64f1a2b3c4d5e6f7g8h9i0j",
  "inventoryCount": 50,
  "size": "Medium",
  "color": "Black",
  "weight": "0.5kg",
  "discountId": "64f1a2b3c4d5e6f7g8h9i0k"
}
```

**Response (201 - Created):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0l",
    "name": "Wireless Headphones",
    "desc": "High-quality wireless headphones with noise cancellation",
    "sku": "WH-2024-BLK",
    "price": 199.99,
    "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "categoryId": "64f1a2b3c4d5e6f7g8h9i0j",
    "inventoryCount": 50,
    "size": "Medium",
    "color": "Black",
    "weight": "0.5kg",
    "discountId": "64f1a2b3c4d5e6f7g8h9i0k",
    "deletedAt": null,
    "createdAt": "2024-01-19T12:00:00.000Z",
    "updatedAt": "2024-01-19T12:00:00.000Z",
    "__v": 0
  },
  "inventoryId": "64f1a2b3c4d5e6f7g8h9i0m"
}
```

**Response (400 - Bad Request):**
```json
{
  "success": false,
  "message": "Missing required fields: name, sku, price, categoryId, and inventoryCount are required"
}
```

**Response (400 - Bad Request):**
```json
{
  "success": false,
  "message": "Product with this SKU already exists"
}
```

**Response (404 - Not Found):**
```json
{
  "success": false,
  "message": "Category not found"
}
```

---

### 2. Get All Products
**Endpoint:** `GET /api/v1/products`

**Permissions Required:** None (Public)

**Query Parameters (Optional):**
- `categoryId` (string): Filter by category ID
- `discountId` (string): Filter by discount ID
- `minPrice` (number): Filter by minimum price
- `maxPrice` (number): Filter by maximum price
- `search` (string): Search in name, description, or SKU

**Example:** `GET /api/v1/products?categoryId=64f1a2b3c4d5e6f7g8h9i0j&minPrice=50&maxPrice=200&search=headphones`

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "products": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0l",
      "name": "Wireless Headphones",
      "desc": "High-quality wireless headphones with noise cancellation",
      "sku": "WH-2024-BLK",
      "price": 199.99,
      "images": ["https://example.com/image1.jpg"],
      "categoryId": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j",
        "name": "Electronics",
        "desc": "Electronic devices"
      },
      "inventoryCount": 50,
      "size": "Medium",
      "color": "Black",
      "weight": "0.5kg",
      "discountId": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0k",
        "name": "Winter Sale",
        "desc": "20% off on electronics",
        "discountPercent": 20,
        "active": true
      },
      "deletedAt": null,
      "createdAt": "2024-01-19T12:00:00.000Z",
      "updatedAt": "2024-01-19T12:00:00.000Z",
      "__v": 0
    }
  ]
}
```

---

### 3. Get Product by ID
**Endpoint:** `GET /api/v1/products/:id`

**Permissions Required:** None (Public)

**Path Parameters:**
- `id` (string): The product ID

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "product": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0l",
    "name": "Wireless Headphones",
    "desc": "High-quality wireless headphones with noise cancellation",
    "sku": "WH-2024-BLK",
    "price": 199.99,
    "images": ["https://example.com/image1.jpg"],
    "categoryId": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j",
      "name": "Electronics",
      "desc": "Electronic devices"
    },
    "inventoryCount": 50,
    "size": "Medium",
    "color": "Black",
    "weight": "0.5kg",
    "discountId": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0k",
      "name": "Winter Sale",
      "desc": "20% off on electronics",
      "discountPercent": 20,
      "active": true
    },
    "deletedAt": null,
    "createdAt": "2024-01-19T12:00:00.000Z",
    "updatedAt": "2024-01-19T12:00:00.000Z",
    "__v": 0
  }
}
```

**Response (404 - Not Found):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### 4. Update Product
**Endpoint:** `PUT /api/v1/products/:id`

**Permissions Required:** `update-product`

**Path Parameters:**
- `id` (string): The product ID

**Request Body:**
```json
{
  "name": "Premium Wireless Headphones",
  "price": 249.99,
  "inventoryCount": 75,
  "color": "Silver"
}
```

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0l",
    "name": "Premium Wireless Headphones",
    "desc": "High-quality wireless headphones with noise cancellation",
    "sku": "WH-2024-BLK",
    "price": 249.99,
    "images": ["https://example.com/image1.jpg"],
    "categoryId": "64f1a2b3c4d5e6f7g8h9i0j",
    "inventoryCount": 75,
    "size": "Medium",
    "color": "Silver",
    "weight": "0.5kg",
    "discountId": "64f1a2b3c4d5e6f7g8h9i0k",
    "deletedAt": null,
    "createdAt": "2024-01-19T12:00:00.000Z",
    "updatedAt": "2024-01-19T12:05:00.000Z",
    "__v": 0
  }
}
```

**Response (400 - Bad Request):**
```json
{
  "success": false,
  "message": "Product with this SKU already exists"
}
```

**Response (404 - Not Found):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### 5. Delete Product (Soft Delete)
**Endpoint:** `DELETE /api/v1/products/:id`

**Permissions Required:** `delete-product`

**Path Parameters:**
- `id` (string): The product ID

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Response (404 - Not Found):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

**Response (400 - Bad Request):**
```json
{
  "success": false,
  "message": "Product is already deleted"
}
```

---

### 6. Get Products by Category
**Endpoint:** `GET /api/v1/products/category/:categoryId`

**Permissions Required:** None (Public)

**Path Parameters:**
- `categoryId` (string): The category ID

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "category": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j",
    "name": "Electronics",
    "desc": "Electronic devices"
  },
  "products": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0l",
      "name": "Wireless Headphones",
      "sku": "WH-2024-BLK",
      "price": 199.99,
      "inventoryCount": 50,
      "categoryId": "64f1a2b3c4d5e6f7g8h9i0j",
      "discountId": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0k",
        "name": "Winter Sale",
        "discountPercent": 20,
        "active": true
      }
    }
  ]
}
```

**Response (404 - Not Found):**
```json
{
  "success": false,
  "message": "Category not found"
}
```

---

### 7. Update Product Inventory Count
**Endpoint:** `PATCH /api/v1/products/:id/inventory`

**Permissions Required:** `update-product`

**Path Parameters:**
- `id` (string): The product ID

**Request Body:**
```json
{
  "inventoryCount": 100
}
```

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Product inventory count updated successfully",
  "product": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0l",
    "name": "Wireless Headphones",
    "inventoryCount": 100,
    "updatedAt": "2024-01-19T12:10:00.000Z"
  }
}
```

**Response (400 - Bad Request):**
```json
{
  "success": false,
  "message": "inventoryCount must be a number"
}
```

**Response (400 - Bad Request):**
```json
{
  "success": false,
  "message": "Inventory count cannot be negative"
}
```

---

### 8. Get Products with Active Discount
**Endpoint:** `GET /api/v1/products/discount/active`

**Permissions Required:** None (Public)

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Products with discount retrieved successfully",
  "products": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0l",
      "name": "Wireless Headphones",
      "sku": "WH-2024-BLK",
      "price": 199.99,
      "inventoryCount": 50,
      "discountId": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0k",
        "name": "Winter Sale",
        "desc": "20% off on electronics",
        "discountPercent": 20,
        "active": true
      }
    }
  ]
}
```

---

## Error Responses

All endpoints may return the following error responses:

**500 - Internal Server Error:**
```json
{
  "message": "Internal server error"
}
```

**404 - Route Not Found:**
```json
{
  "success": false,
  "error": "Route not found"
}
```

---

## Data Model

### Product Schema
```javascript
{
  name: String,
  desc: String,
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  price: Number,
  images: {
    type: [String],
    default: [],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
  inventoryCount: {
    type: Number,
    required: true,
  },
  size: String,
  color: String,
  weight: String,
  discountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discount",
    default: null,
  },
  deletedAt: Date,
}
```

### Relationships
- **categoryId**: References ProductCategory model
- **discountId**: References Discount model (optional)
- **inventoryCount**: Tracks stock quantity (can be synced with ProductInventory model)

---

## Usage Examples

### Create a new product
```bash
curl -X POST http://localhost:5000/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "name": "Wireless Headphones",
    "desc": "High-quality wireless headphones",
    "sku": "WH-2024-BLK",
    "price": 199.99,
    "categoryId": "64f1a2b3c4d5e6f7g8h9i0j",
    "inventoryCount": 50,
    "color": "Black"
  }'
```

### Get all products with filters
```bash
curl "http://localhost:5000/api/v1/products?categoryId=64f1a2b3c4d5e6f7g8h9i0j&minPrice=50&maxPrice=200&search=headphones"
```

### Get product by ID
```bash
curl http://localhost:5000/api/v1/products/64f1a2b3c4d5e6f7g8h9i0l
```

### Update product
```bash
curl -X PUT http://localhost:5000/api/v1/products/64f1a2b3c4d5e6f7g8h9i0l \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{"price": 249.99, "inventoryCount": 75}'
```

### Get products by category
```bash
curl http://localhost:5000/api/v1/products/category/64f1a2b3c4d5e6f7g8h9i0j
```

### Update product inventory count
```bash
curl -X PATCH http://localhost:5000/api/v1/products/64f1a2b3c4d5e6f7g8h9i0l/inventory \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{"inventoryCount": 100}'
```

### Get products with active discounts
```bash
curl http://localhost:5000/api/v1/products/discount/active
```

### Delete product
```bash
curl -X DELETE http://localhost:5000/api/v1/products/64f1a2b3c4d5e6f7g8h9i0l \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## Files Created/Modified

### Created Files:
1. `src/modules/services/product.service.js` - Business logic for product operations
2. `src/modules/controllers/product.controller.js` - Request handlers for product endpoints
3. `src/modules/routes/product.routes.js` - Route definitions for product APIs

### Modified Files:
1. `src/app.js` - Added product routes to the application

---

## Notes

- All endpoints follow the same response structure with `success`, `message`, and data fields
- Soft delete is implemented using the `deletedAt` field
- Products are automatically filtered to exclude deleted items (unless specified otherwise)
- SKU must be unique across all products
- Required fields: `name`, `sku`, `price`, `categoryId`, `inventoryCount`
- The `inventoryCount` field tracks stock quantity and can be updated independently
- Discount validation ensures only valid discount IDs are assigned
- Category validation ensures products are assigned to existing categories
- Query parameters allow flexible filtering and searching
- Permission middleware (`requireUserAndPermission`) is applied to create, update, and delete operations
