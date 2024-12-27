const jwt = require('jsonwebtoken');
const { findStudent, findRecruiter } = require('../services/userService');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const generateToken = async (email, userType) => {
  var user, payload;
  if (userType === 'student') {
    user = await findStudent(email);
    payload = {
      userId: user.id,
      email: user.email,
      name: user.firstName,
      familyName: user.lastName,
      usertype: 'student',
    };
  } else if (userType === 'recruiter') {
    user = await findRecruiter(email);
    payload = {
      userId: user.id,
      email: user.email,
      name: user.companyName,
      usertype: 'recruiter',
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
