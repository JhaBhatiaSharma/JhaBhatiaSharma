const {
  registerStudent,
  registerRecruiter,
  findStudent,
  findRecruiter,
} = require('../services/userService');
const { requestOTPService, verifyOTPService } = require('../services/otpService');
const { generateToken } = require('../services/authService');

//--------------------------------------------------------------------------------------------------------------
//REGISTER AND LOGIN APIs
//--------------------------------------------------------------------------------------------------------------
const registerUser = async (req, res) => {
  try {
    const userType = req.headers.usertype;
    if (!userType) {
      return res.status(400).json({ message: 'UserType header is required.' });
    }

    if (userType === 'student') {
      const {
        firstName,
        lastName,
        email,
        mobileNumber,
        dateOfBirth,
        gender,
        profilePicture,
        linkedinProfile,
        githubProfile,
      } = req.body;

      if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: 'First name, last name and email are required.' });
      }

      const user = await registerStudent({
        firstName,
        lastName,
        email,
        mobileNumber,
        dateOfBirth,
        gender,
        profilePicture,
        linkedinProfile,
        githubProfile,
      });
      return res.status(201).json({
        message: 'User successfully registered',
        user,
      });
    } else if (userType === 'recruiter') {
      const { companyName, email, companyLogo, linkedinProfile } = req.body;

      const user = await registerRecruiter({ companyName, email, companyLogo, linkedinProfile });
      return res.status(201).json({
        message: 'User successfully registered',
        user,
      });
    } else {
      return res.status(400).json({ message: 'Invalid userType passed.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const userType = req.headers.usertype;
    if (!userType) {
      return res.status(400).json({ message: 'UserType header is required.' });
    }

    const { email } = req.query;
    console.log('Login Request for Email:', email);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    var user;
    if (userType === 'student') {
      user = await findStudent(email);
    } else if (userType === 'recruiter') {
      user = await findRecruiter(email);
    } else {
      return res.status(400).json({ message: 'Invalid userType passed.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User found', data: user });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

//--------------------------------------------------------------------------------------------------------------
//AUTHENTICATION VIA OTP APIs
//--------------------------------------------------------------------------------------------------------------
const requestOTP = async (req, res) => {
  try {
    const userType = req.headers.usertype;
    if (!userType) {
      return res.status(400).json({ message: 'UserType header is required.' });
    }

    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    console.log('Generate OTP request for Email:', email);

    var user;
    if (userType === 'student') {
      user = await findStudent(email);
    } else if (userType === 'recruiter') {
      user = await findRecruiter(email);
    } else {
      return res.status(400).json({ message: 'Invalid userType passed.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'No user found.' });
    }

    const result = await requestOTPService(email, user.id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const userType = req.headers.usertype;
    if (!userType) {
      return res.status(400).json({ message: 'UserType header is required.' });
    }

    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
    console.log('Verify OTP request for Email:', email);

    var user;
    if (userType === 'student') {
      user = await findStudent(email);
    } else if (userType === 'recruiter') {
      user = await findRecruiter(email);
    } else {
      return res.status(400).json({ message: 'Invalid userType passed.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'No user found.' });
    }

    const result = await verifyOTPService(otp, user.id);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    return res.status(500).json({ message: 'An error occurred while verifying OTP.' });
  }
};

//--------------------------------------------------------------------------------------------------------------
//ACCESS TOKEN GENERATION API
//--------------------------------------------------------------------------------------------------------------
const generateAccessToken = async (req, res) => {
  try {
    const userType = req.headers.usertype;
    if (!userType) {
      return res.status(400).json({ message: 'UserType header is required.' });
    }

    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    console.log(email);
    const token = await generateToken(email, userType);
    res.json({
      message: 'Token generated successfully',
      token_type: 'Bearer',
      access_token: token,
      expiry_time: process.env.JWT_EXPIRATION,
    });
  } catch (error) {
    console.error('Error in getTokenForEmail controller:', error);
    if (error.message === 'User not found') {
      res.status(404).json({ error: error.message });
    } else if (error.message === 'Email is required') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = { registerUser, loginUser, requestOTP, verifyOTP, generateAccessToken };
