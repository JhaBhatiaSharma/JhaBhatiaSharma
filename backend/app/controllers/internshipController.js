const {
  addInternshipService,
  deleteInternshipService,
  modifyInternshipService,
  fetchAllInternshipsService,
  fetchInternshipByIdService,
} = require('../services/recruiterService');

const checkRecruiterPermission = async (body) => {
  if (body.usertype === 'recuiter') {
    return true;
  }
  return false;
};

const addInternship = async (req, res) => {
  try {
    const userPermission = checkRecruiterPermission(req.user);
    if (!userPermission) {
      return res.status(400).json({ message: 'User does not have sufficient permissions' });
    }

    const internshipData = req.body;
    const result = await addInternshipService(internshipData);
    res.status(201).json({ message: 'Internship added successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding internship', error: error.message });
  }
};

const deleteInternship = async (req, res) => {
  try {
    const userPermission = checkRecruiterPermission(req.user);
    if (!userPermission) {
      return res.status(400).json({ message: 'User does not have sufficient permissions' });
    }

    const internshipId = req.query.id;

    if (!internshipId) {
      return res.status(400).json({ message: 'Internship ID is required' });
    }
    await deleteInternshipService(internshipId);
    res.status(200).json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting internship', error: error.message });
  }
};

const fetchAllInternship = async (req, res) => {
  try {
    const userPermission = checkRecruiterPermission(req.user);
    if (!userPermission) {
      return res.status(400).json({ message: 'User does not have sufficient permissions' });
    }

    const recruiterId = req.query.id;
    if (!recruiterId) {
      return res.status(400).json({ message: 'Recruiter ID is required' });
    }

    const internships = await fetchAllInternshipsService(recruiterId);
    res.status(200).json({ message: 'Internships fetched successfully', data: internships });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching internships', error: error.message });
  }
};

const fetchIdInternship = async (req, res) => {
  try {
    const internshipId = req.query.id;
    if (!internshipId) {
      return res.status(400).json({ message: 'Internship ID is required' });
    }
    const internship = await fetchInternshipByIdService(internshipId);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.status(200).json({ message: 'Internship fetched successfully', data: internship });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching internship', error: error.message });
  }
};

module.exports = { addInternship, deleteInternship, fetchAllInternship, fetchIdInternship };
