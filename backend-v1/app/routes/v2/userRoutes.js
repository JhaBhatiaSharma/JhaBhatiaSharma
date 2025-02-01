const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../middlewares/v2/authMiddleware');
const { getUserProfile, updateUserProfile, getUsersByRole, resetPassword } = require('../../controllers/v2/userController');
const { getAllRecruiters } = require('../../controllers/v2/recruiterController');

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/', authMiddleware, roleMiddleware(['admin']), getUsersByRole);
router.post('/reset-password', authMiddleware,resetPassword);
router.get('/get-all-recruiters', authMiddleware, getAllRecruiters);

module.exports = router;

