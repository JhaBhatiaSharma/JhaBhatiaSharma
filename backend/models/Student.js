const mongoose = require('mongoose');
const User = require('./User'); // Base User Schema

const studentSchema = new mongoose.Schema({
  profile: {
    university: { type: String, required: true },
    skills: [String],
    experience: [{ company: String, title: String, description: String }],
  },
});

module.exports = User.discriminator('Student', studentSchema);
