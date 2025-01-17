const { Message, Conversation } = require('../models/Message');
const User = require('../models/User');
const Student = require('../models/Student');
const Internship = require('../models/Internship');

// New function to get available users to chat with
const getAvailableUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let availableUsers = [];

    if (userRole === 'student') {
      // For students: Get recruiters from internships they've applied to
      const student = await Student.findById(userId)
        .populate({
          path: 'appliedInternships',
          populate: {
            path: 'recruiter',
            select: 'firstName lastName role profile.companyName email'
          }
        });

      if (student && student.appliedInternships) {
        // Extract unique recruiters
        availableUsers = student.appliedInternships
          .map(internship => internship.recruiter)
          .filter((recruiter, index, self) => 
            recruiter && // Ensure recruiter exists
            index === self.findIndex(r => r._id.toString() === recruiter._id.toString())
          );
      }

    } else if (userRole === 'recruiter') {
      // For recruiters: Get students who applied to their internships
      const internships = await Internship.find({ recruiter: userId })
        .populate('applicants', 'firstName lastName role email');

      availableUsers = internships
        .flatMap(internship => internship.applicants)
        .filter((student, index, self) => 
          student && // Ensure student exists
          index === self.findIndex(s => s._id.toString() === student._id.toString())
        );

    } else if (userRole === 'admin') {
      // For admins: Get all users except themselves
      availableUsers = await User.find({
        _id: { $ne: userId },
        role: { $in: ['student', 'recruiter'] }
      })
      .select('firstName lastName role email profile.companyName');
    }

    res.json(availableUsers);
  } catch (error) {
    console.error('Error fetching available users:', error);
    res.status(500).json({ message: 'Failed to fetch available users' });
  }
};

// Get recent conversations
const getRecentChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const recentChats = await Conversation.find({
      participants: userId,
    })
      .populate('participants', 'firstName lastName role profile.companyName') // Added profile.companyName
      .sort({ lastUpdated: -1 });

    res.status(200).json(recentChats || []);
  } catch (error) {
    console.error('Error fetching recent chats:', error);
    res.status(500).json({ message: 'Failed to fetch recent chats' });
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
      .populate('sender', 'firstName lastName role profile.companyName')
      .populate('receiver', 'firstName lastName role profile.companyName');

    res.status(200).json(messages || []);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

// Start a new conversation
const startConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    if (!receiverId) {
      return res.status(400).json({ message: 'Receiver ID is required.' });
    }

    // Check if a conversation already exists
    const existingConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate('participants', 'firstName lastName role profile.companyName');

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    // Create a new conversation
    const newConversation = new Conversation({
      participants: [senderId, receiverId],
      lastUpdated: Date.now(),
    });

    await newConversation.save();
    
    // Populate the participants before sending response
    const populatedConversation = await Conversation.findById(newConversation._id)
      .populate('participants', 'firstName lastName role profile.companyName');

    res.status(201).json(populatedConversation);
  } catch (error) {
    console.error('Error starting conversation:', error);
    res.status(500).json({ message: 'Failed to start conversation' });
  }
};

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    if (!conversationId || !content) {
      return res.status(400).json({ message: 'Conversation ID and content are required.' });
    }

    const message = new Message({
      conversationId,
      sender: req.user.id,
      content,
      timestamp: Date.now(),
    });

    await message.save();

    // Update the conversation's last message and timestamp
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: content,
      lastUpdated: Date.now(),
    });

    // Populate sender details before sending response
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'firstName lastName role profile.companyName');

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

module.exports = {
  getRecentChats,
  getMessages,
  startConversation,
  sendMessage,
  getAvailableUsers  // Added export
};