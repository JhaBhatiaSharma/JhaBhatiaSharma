const mongoose = require('mongoose');

const options = { discriminatorKey: 'type', collection: 'users' }; // Discriminator key

// Base User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'student', 'recruiter'], default: 'student' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    password: { type: String, required: true },
  },
  options
);

module.exports = mongoose.model('User', userSchema);


