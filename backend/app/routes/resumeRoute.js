const express = require('express');
const multer = require('multer');
const { getResumeController, createResumeController ,updateResumeController, deleteResumeController } = require('../controllers/resumeController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/fetchResume', getResumeController);
router.post('createResume', upload.single('resume'), createResumeController);
router.post('/updateResume', upload.single('resume'), updateResumeController);
router.get('/deleteResume', deleteResumeController);

module.exports = router;