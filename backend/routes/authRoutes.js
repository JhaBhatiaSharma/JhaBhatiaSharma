const express = require('express');
const { register, login } = require('../controllers/authController');
const {
    registerStudent,
    loginStudent,
  } = require('../controllers/studentController');
  const {
    registerRecruiter,
    loginRecruiter,
  } = require('../controllers/recruiterController');
  
const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// Student Routes
router.post('/student/register', registerStudent);
router.post('/student/login', loginStudent);

// Recruiter Routes
router.post('/company/register', registerRecruiter);
router.post('/company/login', loginRecruiter);

module.exports = router;

