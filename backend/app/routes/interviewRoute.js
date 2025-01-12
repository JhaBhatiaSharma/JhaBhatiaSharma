const express = require('express');
const { getAllInterviewsController, getInterviewController, addInterviewController, updateInterviewController } = require('../controllers/InterviewController');

const router = express.Router();

router.get('/fetchAllInterviews', getAllInterviewsController);
router.get('/fetchInterview', getInterviewController);
router.post('/scheduleInterview', addInterviewController);
router.post('/updateInterview', updateInterviewController);

module.exports = router;