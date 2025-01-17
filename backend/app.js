require('dotenv').config();
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
const cvRoutes = require('./routes/cvRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes'); // Add this line
const adminRoutes = require('./routes/adminRoutes')
const complaintRoutes = require('./routes/complaintRoutes')
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
app.use('/api/cv', cvRoutes);
app.use('/api/recommendations', recommendationRoutes); // Add this line
app.use('/api/chats', messagingRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/complaints',complaintRoutes)

// Error handling middleware
app.use(errorHandler);

module.exports = app;