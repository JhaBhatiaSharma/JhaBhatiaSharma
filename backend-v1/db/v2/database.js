// utils/database.js
const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');

const connectDB = async () => {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI is not defined in the config.');

    await mongoose.connect(MONGO_URI); // Removed deprecated options
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

module.exports = connectDB;

