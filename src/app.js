const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const connectDB = require("./config/db")
const mongoose = require('mongoose');

const app = express();


// Middleware
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://ecommerce-client-pearl-six.vercel.app/" // frontend live URL
    ],
    credentials: true
}));
app.use(express.json());

// Ensure DB connection for serverless environments (Vercel)
const ensureDbConnected = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await connectDB();
        }
        return next();
    } catch (err) {
        console.error('DB connection error on request:', err.message || err);
        return res.status(500).json({ success: false, message: 'Database connection error' });
    }
};

app.use(ensureDbConnected);


// Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "welcome to api",
    });
});

// Auth routes
const authRoutes = require('./modules/routes/auth.routes');
app.use('/api/v1/auth', authRoutes);

// Category routes
const categoryRoutes = require('./modules/routes/category.routes');
app.use('/api/v1/categories', categoryRoutes);

// Product routes
const productRoutes = require('./modules/routes/product.routes');
app.use('/api/v1/products', productRoutes);

// Cart routes
const cartRoutes = require('./modules/routes/cart.routes');
app.use('/api/v1/cart', cartRoutes);





// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

module.exports = app
