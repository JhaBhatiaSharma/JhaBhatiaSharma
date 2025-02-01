const { registerRecruiter, loginRecruiter, getRecruiter, updateRecruiter } = require('../../services/v1/recruiterService');
const { generateToken } = require('../../services/v1/authService');

const registerRecruiterController = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, password } = req.body;

    const user = await registerRecruiter({ firstName, lastName, email, mobileNumber, password });

    return res.status(201).json({
      message: 'Recruiter successfully registered',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering recruiter', error: error.message });
  }
};

const loginRecruiterController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginRecruiter({ email, password });
    if (user) {
      const sessionData = await generateToken(email, 'recruiter');
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
    return res.status(500).json({ message: 'Error logging recruiter', error: error.message });
  }
};

const getRecruiterController = async (req,res) => {
  try {
    const email = req.query.email;
    const user = await getRecruiter(email);

    return res.status(200).json({
      message: 'recruiter found',
      userData: user
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching recruiter', error: error.message });
  }
}

const updateRecruiterController = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Validation error: Email is required to identify the recruiter.' });
    }

    const result = await updateRecruiter(email, updateData);

    if (result[0] > 0) {
      return res.status(200).json({ message: 'Recruiter updated successfully.' });
    } else {
      return res.status(404).json({ message: 'Recruiter not found or no changes were made.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating recruiter.', error: error.message });
  }
};

module.exports = { registerRecruiterController, loginRecruiterController, getRecruiterController, updateRecruiterController };