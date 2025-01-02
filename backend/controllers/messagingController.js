const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    const message = new Message({
      sender: req.user.id,
      receiver: receiverId,
      content,
    });

    await message.save();
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [{ sender: req.user.id, receiver: userId }, { sender: userId, receiver: req.user.id }],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecentChats = async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: req.user.id }, { receiver: req.user.id }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: { sender: '$sender', receiver: '$receiver' },
          lastMessage: { $first: '$content' },
          timestamp: { $first: '$timestamp' },
        },
      },
    ]);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

