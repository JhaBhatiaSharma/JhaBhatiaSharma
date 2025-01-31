const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const Internship = require("../models/Internship");

// Register a student
exports.registerStudent = async (req, res) => {
  try {
    const { email, password, firstName, lastName, profile } = req.body;

    
    if (password.length < 8) {
      return res.status(400).json({ message: "Password should be at least 8 characters long" });
    }
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      profile,
      role: "student",
    });

    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login as a student
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: student._id, role: "student", email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: student._id,
        email: student.email,
        role: "student",
        firstName: student.firstName,
        lastName: student.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the interviews lined up for a student
exports.getStudentInterviews = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate("scheduledInterviews.internship");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log("Scheduled Interviews:", student.scheduledInterviews);
    res.status(200).json(student.scheduledInterviews);
  } catch (error) {
    console.error("Error fetching student interviews:", error);
    res.status(500).json({ message: "Failed to fetch interviews" });
  }
};

// Get the interviews completed by the student
exports.getStudentCompletedInterviews = async (req, res) => {
  try {
    const studentId = req.user.id;

    const completedInterviews = await Internship.find({
      "scheduledInterviews.student": studentId,
      "scheduledInterviews.status": "Completed",
    }).populate({
      path: "scheduledInterviews.student",
      select: "firstName lastName email",
    });

    const completed = completedInterviews.flatMap((internship) =>
      internship.scheduledInterviews
        .filter(
          (interview) =>
            interview.student._id.toString() === studentId && interview.status === "Completed"
        )
        .map((interview) => ({
          internshipTitle: internship.title,
          company: internship.recruiter.companyName,
          dateTime: interview.dateTime,
        }))
    );

    res.status(200).json(completed);
  } catch (error) {
    console.error("Error fetching completed interviews:", error);
    res.status(500).json({ message: "Failed to fetch completed interviews" });
  }
};
