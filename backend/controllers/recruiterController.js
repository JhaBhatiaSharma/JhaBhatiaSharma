const bcrypt = require('bcryptjs');
const Recruiter = require('../models/Recruiter');
const jwt = require('jsonwebtoken');
const Internship=require('../models/Internship')
const User=require('../models/User')
exports.registerRecruiter = async (req, res) => {
  try {
    const { email, password, firstName, lastName, profile } = req.body;

    // Check if the recruiter already exists
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password should be at least 8 characters long' });
    }
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: 'Recruiter already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new recruiter
    const recruiter = new Recruiter({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      profile,
      role: "recruiter"
    });

    // Save to the database
    await recruiter.save();

    res.status(201).json({ message: 'Recruiter registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginRecruiter = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the recruiter
      const recruiter = await Recruiter.findOne({ email });
      if (!recruiter) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, recruiter.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: recruiter._id, role: 'recruiter', email: recruiter.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({
        token,
        user: {
          id: recruiter._id,
          email: recruiter.email,
          role: 'recruiter',
          firstName: recruiter.firstName,
          lastName: recruiter.lastName,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getRecruiterInterviews = async (req, res) => {
    try {
      const internships = await Internship.find({ recruiter: req.user.id }).populate({
        path: 'scheduledInterviews.student',
        select: 'firstName lastName email',
      });
  
      if (!internships || internships.length === 0) {
        return res.status(200).json([]);
      }
  
      const interviews = internships.flatMap((internship) =>
        internship.scheduledInterviews
          .filter((interview) => interview.student) // Ensure valid student reference
          .map((interview) => ({
            internshipTitle: internship.title,
            student: interview.student,
            dateTime: interview.dateTime,
            status: interview.status,
            internshipId: internship._id,
            meetLink: interview.meetLink
          }))
      );
  
      res.status(200).json(interviews);
    } catch (error) {
      console.error('Error fetching recruiter interviews:', error);
      res.status(500).json({ message: 'Failed to fetch interviews' });
    }
  };
   

  exports.getAllRecruiters = async (req, res) => {
    const { search } = req.query;
    const query = { role: 'recruiter' };
    if (search) query.firstName = { $regex: search, $options: 'i' };
  
    try {
      console.log('Executing query:', query);
      const recruiters = await User.find(query);
      if (!recruiters.length) {
        console.warn('No recruiters found');
        return res.status(404).json({ message: 'No recruiters found' });
      }
      res.json({ recruiters, total: recruiters.length });
    } catch (err) {
      console.error('Error fetching recruiters:', err);
      res.status(500).json({ error: 'Failed to fetch recruiters', details: err.message });
    }
  };
  
  