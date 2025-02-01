const express = require('express');
const { authMiddleware } = require('../../middlewares/v2/authMiddleware');
const { getRecommendedInternships } = require('../../controllers/v2/recommendationController');

const router = express.Router();

router.get('/recommended-internships', authMiddleware, getRecommendedInternships);

module.exports = router;