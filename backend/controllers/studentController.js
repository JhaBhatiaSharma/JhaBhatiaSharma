const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const Internship=require('../models/Internship')
exports.registerStudent = async (req, res) => {
  try {
    const { email, password, firstName, lastName, profile } = req.body;

    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const student = new Student({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      profile,
      role: "student"
    });

    // Save to the database
    await student.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginStudent = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the student
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: student._id, role: 'student' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({
        token,
        user: {
          id: student._id,
          email: student.email,
          role: 'student',
          firstName: student.firstName,
          lastName: student.lastName,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  exports.getStudentInterviews = async (req, res) => {
    try {
      const student = await Student.findById(req.user.id).populate('scheduledInterviews.internship');
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      console.log('Scheduled Interviews:', student.scheduledInterviews);
      res.status(200).json(student.scheduledInterviews);
    } catch (error) {
      console.error('Error fetching student interviews:', error);
      res.status(500).json({ message: 'Failed to fetch interviews' });
    }
  };

  exports.getStudentCompletedInterviews = async (req, res) => {
    try {
      const studentId = req.user.id;
  
      // Fetch completed interviews
      const completedInterviews = await Internship.find({
        'scheduledInterviews.student': studentId,
        'scheduledInterviews.status': 'Completed',
      }).populate({
        path: 'scheduledInterviews.student',
        select: 'firstName lastName email',
      });
  
      // Filter and structure the response
      const completed = completedInterviews.flatMap((internship) =>
        internship.scheduledInterviews
          .filter(
            (interview) =>
              interview.student._id.toString() === studentId &&
              interview.status === 'Completed'
          )
          .map((interview) => ({
            internshipTitle: internship.title,
            company: internship.recruiter.companyName,
            dateTime: interview.dateTime,
          }))
      );
  
      res.status(200).json(completed);
    } catch (error) {
      console.error('Error fetching completed interviews:', error);
      res.status(500).json({ message: 'Failed to fetch completed interviews' });
    }
  };
  