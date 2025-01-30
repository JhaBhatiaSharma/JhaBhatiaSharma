const express = require('express');
const multer = require('multer');
const { getResumeController, createResumeController ,updateResumeController, deleteResumeController } = require('../../controllers/v1/resumeController');

const router = express.Router();
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX allowed.'), false);
    }
  };
  
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
  });

router.get('/fetchResume', getResumeController);
router.post('/createResume', upload.single('resume'), createResumeController);
router.post('/updateResume', upload.single('resume'), updateResumeController);
router.get('/deleteResume', deleteResumeController);

module.exports = router;