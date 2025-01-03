const mongoose = require('mongoose');
const User = require('./User'); // Base User Schema

const recruiterSchema = new mongoose.Schema({
  profile: {
    companyName: { type: String},
    jobOpenings: [{ title: String, description: String, location: String }],
  },
});

module.exports = User.discriminator('Recruiter', recruiterSchema);
