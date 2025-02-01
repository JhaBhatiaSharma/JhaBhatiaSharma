const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../middlewares/v2/authMiddleware');
const { createComplaint, getComplaints, resolveComplaint,getMyComplaints } = require('../../controllers/v2/complaintController');

const router = express.Router();

router.post('/create-complaint', authMiddleware, createComplaint);
router.get('/get-complaints', authMiddleware, roleMiddleware(['admin']), getComplaints);
router.patch('/:complaintId/resolve', authMiddleware, roleMiddleware(['admin']), resolveComplaint);
router.get('/my-complaints', authMiddleware, getMyComplaints);

module.exports = router;