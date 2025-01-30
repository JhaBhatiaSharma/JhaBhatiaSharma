const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../middlewares/v2/authMiddleware');
const { addInternship, getAllInternships, getInternshipById, applyToInternship, getRecruiterInternships, getStudentInternships, getApplicantsForRecruiter, scheduleInterview, getRecommendedInternships, markInterviewAsCompleted } = require('../../controllers/v2/internshipController');
const { getStudentInterviews, getStudentCompletedInterviews } = require('../../controllers/v2/studentController');
const { getRecruiterInterviews } = require('../../controllers/v2/recruiterController');

const router = express.Router();

router.get('/allinternships', getAllInternships);
router.post('/addinternship', authMiddleware, roleMiddleware(['recruiter']), addInternship);
router.get('/recommended', authMiddleware, roleMiddleware(['student']), getRecommendedInternships);
router.get('/my-internships', authMiddleware, roleMiddleware(['student']), getStudentInternships);
router.get('/student/interviews', authMiddleware, roleMiddleware(['student']), getStudentInterviews);
router.get('/recruiter/list', authMiddleware, roleMiddleware(['recruiter']), getRecruiterInternships);
router.get('/recruiter/interviews', authMiddleware, roleMiddleware(['recruiter']), getRecruiterInterviews);
router.get('/applicants', authMiddleware, roleMiddleware(['recruiter']), getApplicantsForRecruiter);
router.post('/:id/apply', authMiddleware, roleMiddleware(['student']), applyToInternship);
router.post('/:id/schedule', authMiddleware, roleMiddleware(['recruiter']), scheduleInterview);
router.get('/:id([a-fA-F0-9]{24})', getInternshipById);
router.patch('/:internshipId/interviews/:studentId/completed', markInterviewAsCompleted);
router.get('/student/completed-interviews', authMiddleware, getStudentCompletedInterviews);

module.exports = router;