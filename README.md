# E-commerce Server API

A comprehensive backend API server for an e-commerce application built with Node.js, Express.js, and MongoDB. This server provides full CRUD operations for products, categories, user authentication, cart management, and order processing.

## 🚀 Features

- **User Authentication** - User signup, signin, and Google OAuth integration
- **Admin Authentication** - Admin user management with role-based permissions
- **Product Management** - Full CRUD operations for products with inventory tracking
- **Category Management** - Organize products into categories
- **Shopping Cart** - User cart management with session handling
- **Discount System** - Active discount management for products
- **Order Processing** - Complete order and payment management
- **Role-Based Access Control** - Middleware for user and admin permissions
- **Database** - MongoDB with Mongoose ODM
- **Security** - JWT authentication, password hashing with bcrypt
- **Payment Integration** - SSLCommerz payment gateway support
- **Email Service** - Nodemailer integration for notifications
- **CORS Support** - Cross-Origin Resource Sharing enabled for frontend integration

## 📋 API Endpoints

### Base URL
```
https://ecommerce-server-psi-one.vercel.app/
```

### Authentication Routes (`/api/v1/auth`)

#### User Authentication
- `POST /api/v1/auth/user/signup` - User registration
- `POST /api/v1/auth/user/signin` - User login
- `POST /api/v1/auth/user/google` - Google OAuth sign-in

#### Admin Authentication
- `POST /api/v1/auth/admin/signup` - Admin registration
- `POST /api/v1/auth/admin/signin` - Admin login

### Category Routes (`/api/v1/categories`)

- `POST /api/v1/categories` - Create category (Admin - requires `create-category` permission)
- `GET /api/v1/categories` - Get all categories (Public)
- `GET /api/v1/categories/:id` - Get category by ID (Public)
- `PUT /api/v1/categories/:id` - Update category (Admin - requires `update-category` permission)
- `DELETE /api/v1/categories/:id` - Delete category (Admin - requires `delete-category` permission)

### Product Routes (`/api/v1/products`)

- `POST /api/v1/products` - Create product (Admin - requires `create-product` permission)
- `GET /api/v1/products` - Get all products (Public)
- `GET /api/v1/products/:id` - Get product by ID (Public)
- `PUT /api/v1/products/:id` - Update product (Admin - requires `update-product` permission)
- `DELETE /api/v1/products/:id` - Delete product (Admin - requires `delete-product` permission)
- `GET /api/v1/products/category/:categoryId` - Get products by category (Public)
- `PATCH /api/v1/products/:id/inventory` - Update product inventory (Admin - requires `update-product` permission)
- `GET /api/v1/products/discount/active` - Get products with active discounts (Public)

### Cart Routes (`/api/v1/cart`)

- `GET /api/v1/cart` - Get user cart (User - requires authentication)
- `POST /api/v1/cart` - Add item to cart (User - requires authentication)
- `PUT /api/v1/cart/:productId` - Update cart item quantity (User - requires authentication)
- `DELETE /api/v1/cart/:productId` - Remove item from cart (User - requires authentication)
- `DELETE /api/v1/cart` - Clear entire cart (User - requires authentication)
- `GET /api/v1/cart/session` - Get or create user session (User - requires authentication)

### Health Check

- `GET /api/health` - Server health check endpoint (Public)

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt/bcryptjs
- **Payment Gateway**: SSLCommerz
- **Email Service**: Nodemailer
- **CORS**: Cross-Origin Resource Sharing
- **Environment Variables**: dotenv

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/ShoFiq6030/ecommerce-server.git
cd ecommerce-server
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email Configuration (for nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# SSLCommerz Configuration (for payments)
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password
SSLCOMMERZ_IS_SANDBOX=true

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

4. **Start the Server**

Development mode (with auto-restart on file changes):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## 🔐 Authentication & Authorization

### User Roles

1. **Regular User** - Can view products, manage cart, place orders
2. **Admin User** - Full access to all resources including product/category management

### Permission System

The API uses a role-based permission system:

- **User Permissions**: `view-products`, `manage-cart`, `place-orders`
- **Admin Permissions**: `create-product`, `update-product`, `delete-product`, `create-category`, `update-category`, `delete-category`

### Authentication Flow

1. **User/Admin Signin** - Returns JWT token
2. **Token Usage** - Include token in Authorization header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
3. **Protected Routes** - Middleware validates token and checks permissions

## 📝 Sample API Usage

### User Registration
```bash
curl -X POST http://localhost:5000/api/v1/auth/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### User Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/user/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Products (Public)
```bash
curl http://localhost:5000/api/v1/products
```

### Create Product (Admin - Protected)
```bash
curl -X POST http://localhost:5000/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "name": "Smartphone",
    "description": "Latest smartphone with advanced features",
    "price": 599.99,
    "category": "64f1a2b3c4d5e6f7g8h9i0j",
    "inventoryCount": 100,
    "images": ["https://example.com/image1.jpg"]
  }'
```

### Add to Cart (User - Protected)
```bash
curl -X POST http://localhost:5000/api/v1/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "productId": "64f1a2b3c4d5e6f7g8h9i0j",
    "quantity": 2
  }'
```

### Get User Cart (User - Protected)
```bash
curl http://localhost:5000/api/v1/cart \
  -H "Authorization: Bearer <your_jwt_token>"
```

## 📚 API Documentation

For complete API documentation with detailed request/response examples, visit:

**[API Documentation on Postman](https://documenter.getpostman.com/view/26622927/2sBXVihW2S)**

## 🗄️ Database Schema

### User Model
- `_id`, `name`, `email`, `password`, `phone`, `role`, `permissions`, `createdAt`, `updatedAt`

### Admin User Model
- `_id`, `name`, `email`, `password`, `phone`, `adminType`, `permissions`, `createdAt`, `updatedAt`

### Product Model
- `_id`, `name`, `description`, `price`, `category`, `inventoryCount`, `images`, `discount`, `createdAt`, `updatedAt`

### Category Model
- `_id`, `name`, `description`, `createdAt`, `updatedAt`

### Cart & Order Models
- Shopping session, cart items, order details, order items, payment details, shipping address

## 🔧 Middleware

### `isAuthorizedUser`
- Validates JWT token for regular users
- Checks user authentication status

### `isAuthorizedAdmin`
- Validates JWT token for admin users
- Checks specific permission requirements (e.g., `create-product`, `update-category`)

## 🚀 Deployment

### Vercel Deployment

This project is configured for Vercel deployment. The `vercel.json` file includes:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

### Environment Variables on Vercel

Add the same environment variables from your `.env` file to your Vercel project settings.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the database
- SSLCommerz for payment gateway integration
- All contributors and supporters

## 📞 Support

For support and questions:
- **GitHub**: https://github.com/ShoFiq6030/ecommerce-server.git
- **API Documentation**: https://documenter.getpostman.com/view/26622927/2sBXVihW2S

---

**Happy Coding! 🎉**
