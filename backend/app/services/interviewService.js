const Interview = require('../models/index');

async function getAllInterviews() {
  return await Interview.findAll();
}

async function getInterviewById(id) {
  return await Interview.findByPk(id);
}

async function addInterview(data) {
  return await Interview.create(data);
}

async function updateInterview(id, data) {
  const interview = await Interview.findByPk(id);
  if (!interview) {
    throw new Error('Interview not found');
  }
  return await interview.update(data);
}

module.exports = { getAllInterviews, getInterviewById, addInterview, updateInterview };
