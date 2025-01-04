const mongoose = require('mongoose');
const User = require('./User'); // Base User Schema

const studentSchema = new mongoose.Schema({
  profile: {
    university: { type: String, required: true },
    skills: [String],
    experience: [{ company: String, title: String, description: String }],
  },
  appliedInternships: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' } // List of applied internships
  ],
  scheduledInterviews: [
    {
      internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' },
      dateTime: { type: Date },
    },
  ],
});

module.exports = User.discriminator('Student', studentSchema);
