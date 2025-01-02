const express = require('express');
const { getUserProfile, updateUserProfile, getUsersByRole } = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/', authMiddleware, roleMiddleware(['admin']), getUsersByRole);

module.exports = router;

