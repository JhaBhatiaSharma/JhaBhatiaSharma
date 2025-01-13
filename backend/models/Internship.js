const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  stipend: { 
    type: Number, 
    required: true 
  },
  requiredSkills: {  // Added this field
    type: [String],
    required: true,
    default: []
  },
  preferredSkills: {  // Optional skills that are nice to have
    type: [String],
    default: []
  },
  experienceLevel: {  // Added to better match with student experience
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  recruiter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    index: true 
  },
  applicants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  scheduledInterviews: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      dateTime: { type: Date },
      status: { type: String, enum: ['Scheduled', 'Completed'], default: 'Scheduled' },
    },
  ],
  status: {  // Added to track internship status
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'open'
  },
  applicationDeadline: {  // Added application deadline
    type: Date
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Internship', internshipSchema);