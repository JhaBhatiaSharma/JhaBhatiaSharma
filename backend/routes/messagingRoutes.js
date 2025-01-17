const express = require('express');
const {
  sendMessage,
  getMessages,
  getRecentChats,
  startConversation,
} = require('../controllers/messagingController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, sendMessage); // Send a message
router.get('/chats', authMiddleware, getRecentChats); // Get recent chats
router.get('/:userId', authMiddleware, getMessages); // Get messages in a conversation
router.post('/start', authMiddleware, startConversation); // Start a new conversation

module.exports = router;
