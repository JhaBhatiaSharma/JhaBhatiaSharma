const express = require('express');
const { sendMessage, getMessages, getRecentChats } = require('../controllers/messagingController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.get('/chats', authMiddleware, getRecentChats);
router.get('/:userId', authMiddleware, getMessages);

module.exports = router;

