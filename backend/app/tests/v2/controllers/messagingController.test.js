const { getRecentChats, getMessages, startConversation, sendMessage, getAvailableUsers } = require('../../controllers/messagingController');
const { Message, Conversation } = require('../../models/Message');
const User = require('../../models/User');

// Mock dependencies
jest.mock('../../models/Message');
jest.mock('../../models/User');

describe('Messaging Controller Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = {
      user: { id: 'testUserId' },
      params: {},
      body: {},
      query: {},
    };

    jest.clearAllMocks();
  });

  describe('getAvailableUsers', () => {
    it('should fetch available users', async () => {
      const mockUsers = [{ firstName: 'John', lastName: 'Doe' }];
      User.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUsers)
      });

      await getAvailableUsers(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
    });
  });

  describe('getRecentChats', () => {
    it('should fetch recent chats', async () => {
      const mockChats = [{ participants: ['user1', 'user2'] }];
      Conversation.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue(mockChats)
        })
      });

      await getRecentChats(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockChats);
    });
  });

  describe('getMessages', () => {
    it('should fetch messages', async () => {
      const mockMessages = [{ content: 'Hello' }];
      Message.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockMessages)
        })
      });
      mockRequest.params.userId = 'testConvId';

      await getMessages(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockMessages);
    });
  });

  describe('startConversation', () => {
    it('should start new conversation', async () => {
      const mockConversation = {
        _id: 'conv1',
        participants: ['user1', 'user2'],
        save: jest.fn()
      };

      Conversation.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });

      Conversation.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockConversation)
      });

      mockRequest.body.receiverId = 'receiver123';

      await startConversation(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
  });

  describe('sendMessage', () => {
    it('should send message', async () => {
      const mockMessage = { content: 'Hello' };
      
      Message.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockMessage)
      });

      mockRequest.body = {
        conversationId: 'conv1',
        content: 'Hello'
      };

      await sendMessage(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
  });
});