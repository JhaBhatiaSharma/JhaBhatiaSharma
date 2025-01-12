const express = require('express');
const { validateRequest } = require('../middlewares/validation');
const { registerStudentController, loginStudentController, getStudentController, updateStudentController } = require('../controllers/studentController');
const { registerRecruiterController, loginRecruiterController, getRecruiterController, updateRecruiterController } = require('../controllers/recruiterController');

const router = express.Router();

router.post('/registerStudent', validateRequest('register'), registerStudentController);
router.get('/loginStudent', validateRequest('login'), loginStudentController);
router.get('/fetchStudent', getStudentController);
router.post('/updateStudent', validateRequest('updateStudent'), updateStudentController),


router.post('/registerRecruiter', validateRequest('register'), registerRecruiterController);
router.get('/loginRecruiter', validateRequest('login'), loginRecruiterController);
router.get('/fetchRecruiter', getRecruiterController);
router.post('/updateRecruiter', validateRequest('updateRecuiter'), updateRecruiterController),

module.exports = router;