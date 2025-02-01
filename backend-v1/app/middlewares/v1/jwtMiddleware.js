const jwt = require('jsonwebtoken');
const { getStudent } = require('../../services/v1/studentService');
const { getRecruiter } = require('../../services/v1/recruiterService');

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
    let user = await getStudent(email);
    let role, name;

    if (user) {
      role = 'student';
      name = user.firstName;
    } else {
      user = await getRecruiter(email);
      if (user) {
        role = 'recruiter';
        name = user.companyName;
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'No user found.' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      usertype: role,
      name: name,
    };

    next();
  } catch (error) {
    console.error("JWT error:", error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
