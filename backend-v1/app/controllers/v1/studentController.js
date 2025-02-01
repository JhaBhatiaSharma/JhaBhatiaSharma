const { registerStudent, loginStudent, getStudent, updateStudent } = require('../../services/v1/studentService');
const { generateToken } = require('../../services/v1/authService');

const registerStudentController = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, password } = req.body;

    const user = await registerStudent({ firstName, lastName, email, mobileNumber, password });

    return res.status(201).json({
      message: 'Student successfully registered',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering student', error: error.message });
  }
};

const loginStudentController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginStudent({ email, password });
    if (user) {
      const sessionData = await generateToken(email, 'student');
      return res.status(200).json({
        message: 'Student found',
        userData: user,
        sessionData: {
          tokenType: 'Bearer',
          accessToken: sessionData
        }
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging student', error: error.message });
  }
};

const getStudentController = async (req,res) => {
  try {
    const email = req.query.email;
    const user = await getStudent(email);

    return res.status(200).json({
      message: 'Student found',
      userData: user
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching student', error: error.message });
  }
}

const updateStudentController = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Validation error: Email is required to identify the student.' });
    }

    const result = await updateStudent(email, updateData);

    if (result[0] > 0) {
      return res.status(200).json({ message: 'Student updated successfully.' });
    } else {
      return res.status(404).json({ message: 'Student not found or no changes were made.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating student.', error: error.message });
  }
};

module.exports = { registerStudentController, loginStudentController, getStudentController, updateStudentController };