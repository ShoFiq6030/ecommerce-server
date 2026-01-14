# E-commerce Express API Server

This is the backend API server for the e-commerce application, built with Express.js.

## Features

- Product management (CRUD operations)
- Mock authentication system
- Protected routes for authenticated users
- CORS enabled for Next.js frontend
- In-memory data store (simulating database)

## API Endpoints

### Products
- `GET /api/products` - Get all products (Public)
- `GET /api/products/:id` - Get single product by ID (Public)
- `POST /api/products` - Add new product (Protected - requires auth token)

### Authentication
- `POST /api/auth/login` - Login with mock credentials
- `GET /api/auth/verify` - Verify authentication token (Protected)

### Health
- `GET /api/health` - Health check endpoint

## Mock Credentials

**Email:** `admin@ecommerce.com`  
**Password:** `password123`

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

3. Server runs on `http://localhost:5000` by default

## Sample API Usage

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ecommerce.com","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Add Product (Protected)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mock-auth-token" \
  -d '{"name":"New Product","description":"Test description","price":99.99,"category":"Electronics"}'
```

## Technologies Used

- Express.js
- CORS
- Body Parser
- Node.js
