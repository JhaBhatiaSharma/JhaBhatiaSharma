const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  duration: Number,
  stipend: Number,
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Internship', internshipSchema);

