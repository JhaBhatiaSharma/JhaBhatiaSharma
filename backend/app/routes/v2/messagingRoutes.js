const express = require('express');
const { authMiddleware } = require('../../middlewares/v2/authMiddleware');
const { sendMessage, getMessages, getRecentChats, startConversation, getAvailableUsers } = require('../../controllers/v2/messagingController');

const router = express.Router();

router.post('/send', authMiddleware, sendMessage);
router.get('/chats', authMiddleware, getRecentChats);
router.get('/available-users', authMiddleware, getAvailableUsers);
router.post('/start', authMiddleware, startConversation);
router.get('/:userId', authMiddleware, getMessages);

module.exports = router;