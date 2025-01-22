const { Internship } = require('../models/index');

async function getAllInternships() {
  return await Internship.findAll();
}

async function getInternshipById(id) {
  return await Internship.findByPk(id);
}

async function addInternship(data) {
  return await Internship.create(data);
}

async function updateInternship(id, data) {
  const internship = await Internship.findByPk(id);
  if (!internship) {
    throw new Error('Internship not found');
  }
  return await internship.update(data);
}

async function deleteInternship(id) {
  const internship = await Internship.findByPk(id);
  if (!internship) {
    throw new Error('Internship not found');
  }
  return await internship.destroy();
}

module.exports = { getAllInternships, getInternshipById, addInternship, updateInternship, deleteInternship };
