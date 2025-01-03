const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

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
        { id: student._id, type: 'student' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({
        token,
        user: {
          id: student._id,
          email: student.email,
          type: 'student',
          firstName: student.firstName,
          lastName: student.lastName,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
