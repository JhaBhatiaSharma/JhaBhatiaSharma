const { getUserProfile, updateUserProfile, getUsersByRole } = require('../../controllers/userController');
const User = require('../../models/User');

// Mock the User model
jest.mock('../../models/User');

describe('User Controller Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Set up mock request and response objects
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
  });

  describe('getUserProfile', () => {
    it('should get user profile successfully', async () => {
      // Mock user data
      const mockUser = {
        _id: 'testUserId',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'student'
      };

      // Set up mock request
      mockRequest = {
        user: { id: 'testUserId' }
      };

      // Mock User.findById().select() chain
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      // Call the controller function
      await getUserProfile(mockRequest, mockResponse);

      // Verify the function calls and response
      expect(User.findById).toHaveBeenCalledWith('testUserId');
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle errors when getting user profile', async () => {
      // Set up mock request
      mockRequest = {
        user: { id: 'testUserId' }
      };

      // Mock User.findById() to throw an error
      User.findById.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      // Call the controller function
      await getUserProfile(mockRequest, mockResponse);

      // Verify error handling
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Database error'
      });
    });
  });

  describe('updateUserProfile', () => {
    it('should update user profile successfully', async () => {
      // Mock updated user data
      const mockUpdatedUser = {
        _id: 'testUserId',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'student'
      };

      // Set up mock request with update data
      mockRequest = {
        user: { id: 'testUserId' },
        body: {
          firstName: 'John',
          lastName: 'Doe'
        }
      };

      // Mock User.findByIdAndUpdate().select() chain
      User.findByIdAndUpdate.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUpdatedUser)
      });

      // Call the controller function
      await updateUserProfile(mockRequest, mockResponse);

      // Verify the function calls and response
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'testUserId',
        mockRequest.body,
        { new: true }
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('should handle errors when updating user profile', async () => {
      // Set up mock request with update data
      mockRequest = {
        user: { id: 'testUserId' },
        body: {
          firstName: 'John',
          lastName: 'Doe'
        }
      };

      // Mock User.findByIdAndUpdate() to throw an error
      User.findByIdAndUpdate.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      // Call the controller function
      await updateUserProfile(mockRequest, mockResponse);

      // Verify error handling
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Database error'
      });
    });
  });

  describe('getUsersByRole', () => {
    it('should get users by role successfully', async () => {
      // Mock users data
      const mockUsers = [
        {
          _id: 'user1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          type: 'student'
        },
        {
          _id: 'user2',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          type: 'student'
        }
      ];

      // Set up mock request with role query
      mockRequest = {
        query: { role: 'student' }
      };

      // Mock User.find().select() chain
      User.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUsers)
      });

      // Call the controller function
      await getUsersByRole(mockRequest, mockResponse);

      // Verify the function calls and response
      expect(User.find).toHaveBeenCalledWith({ type: 'student' });
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle errors when getting users by role', async () => {
      // Set up mock request with role query
      mockRequest = {
        query: { role: 'student' }
      };

      // Mock User.find() to throw an error
      User.find.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      // Call the controller function
      await getUsersByRole(mockRequest, mockResponse);

      // Verify error handling
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Database error'
      });
    });
  });
});