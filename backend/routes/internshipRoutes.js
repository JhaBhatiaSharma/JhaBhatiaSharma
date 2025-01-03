const express = require('express');
const {
  addInternship,
  getAllInternships,
  getInternshipById,
  applyToInternship,
  getRecruiterInternships,
} = require('../controllers/internshipController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/allinternships', getAllInternships);
router.get('/:id', getInternshipById);
router.post('/addinternship', authMiddleware, roleMiddleware(['recruiter']), addInternship);
router.post('/:id/apply', authMiddleware, roleMiddleware(['student']), applyToInternship);
router.get('/recruiter/list', authMiddleware, roleMiddleware(['recruiter']), getRecruiterInternships);

module.exports = router;

