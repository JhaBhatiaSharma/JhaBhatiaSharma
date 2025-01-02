const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user.type = user.type;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.type)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

module.exports = { authMiddleware, roleMiddleware };

