const express = require('express');
const { getResumeController, createResumeController ,updateResumeController, deleteResumeController } = require('../controllers/resumeController');

const router = express.Router();

router.get('/fetchResume', getResumeController);
router.post('/updateResume', updateResumeController);
router.post('createResume', createResumeController);
router.get('/deleteResume', deleteResumeController);

module.exports = router;