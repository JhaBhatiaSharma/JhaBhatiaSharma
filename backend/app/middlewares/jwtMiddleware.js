const jwt = require('jsonwebtoken');
const { getStudent } = require('../services/studentService');
const { getRecruiter } = require('../services/recruiterService');

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
    user = await getStudent(email);
    if(!user) {
      name = user.firstName;
      role = 'student';
    } else {
      user = await getRecruiter(email);
      name = user.companyName;
      role = 'recruiter';
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
