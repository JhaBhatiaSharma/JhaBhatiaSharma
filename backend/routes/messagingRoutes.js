const express = require('express');
const {
  sendMessage,
  getMessages,
  getRecentChats,
  startConversation,
  getAvailableUsers,  // Added this import
  
} = require('../controllers/messagingController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Existing routes
router.post('/send', authMiddleware, sendMessage); // Send a message
router.get('/chats', authMiddleware, getRecentChats); // Get recent chats
router.get('/available-users', authMiddleware, getAvailableUsers); // Get available users to chat with
router.post('/start', authMiddleware, startConversation); // Start a new conversation

router.get('/:userId', authMiddleware, getMessages); // Get messages in a conversation


// New route for available users


module.exports = router;