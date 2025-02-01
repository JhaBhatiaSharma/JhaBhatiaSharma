const User = require("../models/User");
const bcrypt = require("bcrypt");



exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password should be at least 8 characters long." });
    }

    
    if (req.user.email !== email) {
      return res.status(403).json({ message: "You can only change your own password." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
