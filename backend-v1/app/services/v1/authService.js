const jwt = require('jsonwebtoken');
const { getStudent } = require('../../services/v1/studentService');
const { getRecruiter } = require('../../services/v1/recruiterService');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const generateToken = async (email, userType) => {
  var user, payload;
  if (userType === 'student') {
    user = await getStudent(email);
    payload = {
      userId: user.id,
      email: user.email,
      name: user.firstName,
      familyName: user.lastName,
    };
  } else if (userType === 'recruiter') {
    user = await getRecruiter(email);
    payload = {
      userId: user.id,
      email: user.email,
      name: user.companyName,
    };
  } else {
    throw new Error('Invalid userType passed');
  }
  if (!user) {
    throw new Error('User not found');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

module.exports = { generateToken };