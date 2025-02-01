const { Message, Conversation } = require('../../models/v2/Message');
const User = require('../../models/v2/User');
const Student = require('../../models/v2/Student');
const Internship = require('../../models/v2/Internship');

// New function to get available users to chat with


const getAvailableUsers = async (req, res) => {
  try {
    const { search, role } = req.query; // Optional query params for filtering
    const userId = req.user.id; // Current user's ID

    const query = { _id: { $ne: userId } }; // Exclude current user

    // Add search filter
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
      ];
    }

    // Add role filter
    if (role) query.role = role;

    // Fetch users
    const users = await User.find(query).select('firstName lastName role email profile.companyName');
    res.json(users);
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

const getMessages = async (req, res) => {
  try {
    const { userId } = req.params; // Use the conversationId instead of userId

    // Fetch messages for the conversation
    const messages = await Message.find({ conversationId: userId })
      .sort({ timestamp: 1 })
      .populate('sender', 'firstName lastName role profile.companyName');

    res.status(200).json(messages || []);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};


// Start a new conversation

const startConversation = async (req, res) => {
  try {
    const { receiverId } = req.body; // ID of the user to chat with
    const senderId = req.user.id; // Current user's ID from middleware

    if (!receiverId) {
      return res.status(400).json({ message: 'Receiver ID is required.' });
    }

    // Check if a conversation already exists between these two users
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate('participants', 'firstName lastName role profile.companyName');

    if (conversation) {
      // If conversation exists, return it
      return res.status(200).json(conversation);
    }

    // Create a new conversation
    conversation = new Conversation({
      participants: [senderId, receiverId],
      lastUpdated: Date.now(),
    });

    await conversation.save();

    // Populate participants for the response
    conversation = await Conversation.findById(conversation._id).populate(
      'participants',
      'firstName lastName role profile.companyName'
    );

    res.status(201).json(conversation);
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
  getAvailableUsers
};