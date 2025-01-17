const { Message, Conversation } = require('../models/Message');
const User = require('../models/User');

// Get recent conversations
const getRecentChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const recentChats = await Conversation.find({
      participants: userId,
    })
      .populate('participants', 'firstName lastName role') // Populate participant details
      .sort({ lastUpdated: -1 });

    res.status(200).json(recentChats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages for a conversation
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    })
      .sort({ timestamp: 1 })
      .populate('sender', 'firstName lastName role') // Include sender details
      .populate('receiver', 'firstName lastName role'); // Include receiver details

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Start a new conversation
const startConversation = async (req, res) => {
  try {
    const { participants } = req.body;

    if (!participants || participants.length !== 2) {
      return res.status(400).json({ message: 'A conversation must have exactly two participants.' });
    }

    // Check if a conversation already exists
    const existingConversation = await Conversation.findOne({
      participants: { $all: participants },
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    // Validate participant roles
    const users = await User.find({ _id: { $in: participants } });

    if (users.length !== 2) {
      return res.status(400).json({ message: 'Invalid participants.' });
    }

    const roles = users.map((user) => user.role);
    if (roles.includes('student') && !roles.includes('admin') && !roles.includes('recruiter')) {
      return res.status(400).json({ message: 'Students can only chat with admins or recruiters.' });
    }

    // Create a new conversation
    const newConversation = new Conversation({ participants });
    await newConversation.save();

    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ message: 'Receiver ID and content are required.' });
    }

    const message = new Message({
      sender: req.user.id,
      receiver: receiverId,
      content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all functions
module.exports = {
  getRecentChats,
  getMessages,
  startConversation,
  sendMessage,
};
