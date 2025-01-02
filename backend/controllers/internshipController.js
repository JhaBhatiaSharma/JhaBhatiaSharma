const Internship = require('../models/Internship');

exports.addInternship = async (req, res) => {
  try {
    const internship = new Internship({ ...req.body, recruiter: req.user.id });
    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate('recruiter', 'firstName lastName email');
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.applyToInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    internship.applicants = internship.applicants || [];
    internship.applicants.push(req.user.id);
    await internship.save();

    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecruiterInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ recruiter: req.user.id }).populate('applicants', 'firstName lastName email');
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

