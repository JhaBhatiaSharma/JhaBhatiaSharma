const mongoose = require('mongoose');
const User = require('./User');

const studentSchema = new mongoose.Schema({
  profile: {
    university: { 
      type: String, 
      required: true 
    },
    skills: [{  // Updated to include skill proficiency
      name: { type: String, required: true },
      proficiency: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
      },
      yearsOfExperience: { type: Number, default: 0 }
    }],
    experience: [{
      company: String,
      title: String,
      description: String,
      startDate: Date,
      endDate: Date,
      skills: [String]  // Skills used in this experience
    }],
    preferredLocations: [String],  // Added for better matching
    preferredRoles: [String],      // Added for better matching
    education: [{
      degree: String,
      field: String,
      university: String,
      graduationYear: Number
    }]
  },
  appliedInternships: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' }
  ],
  scheduledInterviews: [
    {
      internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' },
      dateTime: { type: Date },
      meetLink: { type: String },
      status: {
        type: String,
        enum: ['scheduled', 'Completed', 'Cancelled'],
        default: 'scheduled'
      }
    }
  ],
  savedInternships: [  // Added to track internships student is interested in
    { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' }
  ],
  recommendationPreferences: {  // Added for personalized recommendations
    remote: { type: Boolean, default: false },
    minStipend: { type: Number, default: 0 },
    preferredDuration: { type: Number },  // in months
    interestedIndustries: [String]
  }
});

module.exports = User.discriminator('Student', studentSchema);