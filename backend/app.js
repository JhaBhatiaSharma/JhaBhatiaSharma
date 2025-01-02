const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const userRoutes = require('./routes/userRoutes');
const messagingRoutes = require('./routes/messagingRoutes');

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logger
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messagingRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;

