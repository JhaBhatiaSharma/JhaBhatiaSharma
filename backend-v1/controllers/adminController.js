const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Admin
exports.registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (password.length < 8) {
      return res.status(400).json({ message: "Password should be at least 8 characters long" });
    }
    const existingAdmin = await User.findOne({ email, role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin",
    });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin._id, role: "admin", email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: "admin",
        firstName: admin.firstName,
        lastName: admin.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  const { search, role } = req.query;
  const query = {};
  if (search) query.name = { $regex: search, $options: "i" };
  if (role) query.role = role;

  try {
    const users = await User.find(query); 
    const total = users.length;
    res.json({ users, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add user
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Edit user
exports.editUser = async (req, res) => {
  try {
    const { firstName, lastName, role, profile } = req.body;
    const updates = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (role) updates.role = role; 
    if (profile) updates.profile = profile; 

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
