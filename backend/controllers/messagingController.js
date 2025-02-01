const { Message, Conversation } = require("../models/Message");
const User = require("../models/User");
// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
const Student = require("../models/Student");
// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
const Internship = require("../models/Internship");

// Get the available users to chat with
const getAvailableUsers = async (req, res) => {
  try {
    const { search, role } = req.query;
    const userId = req.user.id;

    const query = { _id: { $ne: userId } }; // Exclude current user

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }

    if (role) query.role = role;

    const users = await User.find(query).select(
      "firstName lastName role email profile.companyName"
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching available users:", error);
    res.status(500).json({ message: "Failed to fetch available users" });
  }
};

// Get recent conversations
const getRecentChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const recentChats = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "firstName lastName role profile.companyName")
      .sort({ lastUpdated: -1 });

    res.status(200).json(recentChats || []);
  } catch (error) {
    console.error("Error fetching recent chats:", error);
    res.status(500).json({ message: "Failed to fetch recent chats" });
  }
};

// Get the message history
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({ conversationId: userId })
      .sort({ timestamp: 1 })
      .populate("sender", "firstName lastName role profile.companyName");

    res.status(200).json(messages || []);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// Start a new conversation
const startConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required." });
    }

    // Check if a conversation already exists between these two users
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("participants", "firstName lastName role profile.companyName");

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

    conversation = await Conversation.findById(conversation._id).populate(
      "participants",
      "firstName lastName role profile.companyName"
    );

    res.status(201).json(conversation);
  } catch (error) {
    console.error("Error starting conversation:", error);
    res.status(500).json({ message: "Failed to start conversation" });
  }
};

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    if (!conversationId || !content) {
      return res.status(400).json({ message: "Conversation ID and content are required." });
    }

    const message = new Message({
      conversationId,
      sender: req.user.id,
      content,
      timestamp: Date.now(),
    });

    await message.save();

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: content,
      lastUpdated: Date.now(),
    });

    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "firstName lastName role profile.companyName"
    );

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

module.exports = {
  getRecentChats,
  getMessages,
  startConversation,
  sendMessage,
  getAvailableUsers,
};
