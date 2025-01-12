// routes/recommendationRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { getRecommendedInternships } = require('../controllers/recommendationController');

router.get('/recommended-internships', authMiddleware, getRecommendedInternships);

module.exports = router;