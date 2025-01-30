const express = require('express');
//const { register, login } = require('../../controllers/v2/authController');
const { registerStudent, loginStudent } = require('../../controllers/v2/studentController');
const { registerRecruiter, loginRecruiter } = require('../../controllers/v2/recruiterController');
const { registerAdmin, loginAdmin } = require('../../controllers/v2/adminController')
  
const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
router.post('/student/register', registerStudent);
router.post('/student/login', loginStudent);

router.post('/company/register', registerRecruiter);
router.post('/company/login', loginRecruiter);

router.post('/admin/register',registerAdmin);
router.post('/admin/login',loginAdmin)

module.exports = router;

