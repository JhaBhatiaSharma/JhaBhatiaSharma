const express = require('express');
const {
  addInternship,
  getAllInternships,
  getInternshipById,
  applyToInternship,
  getRecruiterInternships,
  getStudentInternships,
  getApplicantsForRecruiter,
  scheduleInterview
} = require('../controllers/internshipController');
const {getStudentInterviews} = require('../controllers/studentController')
const {getRecruiterInterviews} = require('../controllers/recruiterController')
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/my-internships', authMiddleware, roleMiddleware(['student']), getStudentInternships);

router.get('/allinternships', getAllInternships);
router.get('/:id([a-fA-F0-9]{24})', getInternshipById);
router.get(
  '/applicants',
  authMiddleware,
  roleMiddleware(['recruiter']),
  getApplicantsForRecruiter
);
router.post(
  '/:id/schedule',
  authMiddleware,
  roleMiddleware(['recruiter']),
  scheduleInterview
);
router.get(
  '/student/interviews',
  authMiddleware,
  roleMiddleware(['student']),
  getStudentInterviews
);
router.get(
  '/recruiter/interviews',
  authMiddleware,
  roleMiddleware(['recruiter']),
  getRecruiterInterviews
);

router.post('/addinternship', authMiddleware, roleMiddleware(['recruiter']), addInternship);
router.post('/:id/apply', authMiddleware, roleMiddleware(['student']), applyToInternship);
router.get('/recruiter/list', authMiddleware, roleMiddleware(['recruiter']), getRecruiterInternships);


module.exports = router;

