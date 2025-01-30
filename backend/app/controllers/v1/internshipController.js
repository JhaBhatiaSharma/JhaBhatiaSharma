const { getAllInternships, getInternshipById, addInternship, updateInternship, deleteInternship } = require('../../services/v1/InternshipService');

async function getAllInternshipsController(req, res) {
  try {
    const internships = await getAllInternships();
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getInternshipController(req, res) {
  const { id } = req.query;
  try {
    const internship = await getInternshipById(id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addInternshipController(req, res) {
  try {
    const newInternship = await addInternship(req.body);
    res.status(201).json(newInternship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateInternshipController(req, res) {
  const { id } = req.body;
  try {
    const updatedInternship = await updateInternship(id, req.body);
    res.status(200).json(updatedInternship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteInternshipController(req, res) {
  const { id } = req.query;
  try {
    await deleteInternship(id);
    res.status(200).json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAllInternshipsController, getInternshipController, addInternshipController, updateInternshipController, deleteInternshipController };
