const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




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
