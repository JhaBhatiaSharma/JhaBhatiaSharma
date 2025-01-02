const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    const users = await User.find({ type: role }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

