const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['student', 'recruiter', 'admin'], required: true },
  profile: {
    university: String,
    skills: [String],
    experience: [{ company: String, title: String, description: String }],
  },
});

module.exports = mongoose.model('User', userSchema);

