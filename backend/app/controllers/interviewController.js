const { getAllInterviews, getInterviewById, addInterview, updateInterview } = require('../services/interviewService');

async function getAllInterviewsController(req, res) {
  try {
    const interviews = await getAllInterviews();
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getInterviewController(req, res) {
  const { id } = req.query;
  try {
    const interview = await getInterviewById(id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addInterviewController(req, res) {
  try {
    const newInterview = await addInterview(req.body);
    res.status(201).json(newInterview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateInterviewController(req, res) {
  const { id } = req.body;
  try {
    const updatedInterview = await updateInterview(id, req.body);
    res.status(200).json(updatedInterview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAllInterviewsController, getInterviewController, addInterviewController, updateInterviewController };
