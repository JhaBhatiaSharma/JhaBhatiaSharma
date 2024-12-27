const jwt = require('jsonwebtoken');
const { findStudent, findRecruiter } = require('../services/userService');

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { email } = decoded;

    const userType = req.headers.usertype;
    if (!userType) {
      return res.status(400).json({ message: 'UserType header is required.' });
    }

    var user;
    var name;
    var usertype;
    if (userType === 'student') {
      user = await findStudent(email);
      name = user.firstName;
      usertype = 'student';
    } else if (userType === 'recruiter') {
      user = await findRecruiter(email);
      name = user.companyName;
      usertype = 'recruiter';
    } else {
      return res.status(400).json({ message: 'Invalid userType passed.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'No user found.' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      usertype: usertype,
      name: name,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
