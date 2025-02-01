const express = require('express');
const { validateRequest } = require('../../middlewares/v1/validation');
const { registerStudentController, loginStudentController, getStudentController, updateStudentController } = require('../../controllers/v1/studentController');
const { registerRecruiterController, loginRecruiterController, getRecruiterController, updateRecruiterController } = require('../../controllers/v1/recruiterController');

const router = express.Router();

router.post('/registerStudent', validateRequest('register'), registerStudentController);
router.get('/loginStudent', validateRequest('login'), loginStudentController);
router.get('/fetchStudent', getStudentController);
router.post('/updateStudent', validateRequest('updateStudent'), updateStudentController),

router.post('/registerRecruiter', validateRequest('register'), registerRecruiterController);
router.get('/loginRecruiter', validateRequest('login'), loginRecruiterController);
router.get('/fetchRecruiter', getRecruiterController);
router.post('/updateRecruiter', validateRequest('updateRecruiter'), updateRecruiterController),

module.exports = router;