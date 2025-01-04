const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  duration: Number,
  stipend: Number,
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  scheduledInterviews: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      dateTime: { type: Date },
    },
  ],
});

module.exports = mongoose.model('Internship', internshipSchema);

