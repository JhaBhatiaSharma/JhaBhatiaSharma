const { register, login } = require('../../controllers/authController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Mock dependencies
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../models/User');

describe('Auth Controller Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = {
      body: {},
    };

    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
        type: 'student',
        firstName: 'John',
        lastName: 'Doe',
        profile: {},
      };

      bcrypt.hash.mockResolvedValue('hashedpassword');
      User.prototype.save = jest.fn().mockResolvedValue();

      await register(mockRequest, mockResponse);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
    });

    it('should handle errors during registration', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
        type: 'student',
        firstName: 'John',
        lastName: 'Doe',
        profile: {},
      };

      bcrypt.hash.mockRejectedValue(new Error('Hashing failed'));
      
      await register(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Hashing failed' });
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      mockRequest.body = { email: 'test@example.com', password: 'password123' };

      const mockUser = { _id: 'userId123', email: 'test@example.com', password: 'hashedpassword', type: 'student' };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('jsonwebtoken');

      await login(mockRequest, mockResponse);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'userId123', type: 'student' }, process.env.JWT_SECRET, { expiresIn: '1d' });
      expect(mockResponse.json).toHaveBeenCalledWith({ token: 'jsonwebtoken' });
    });

    it('should return 401 for invalid credentials', async () => {
      mockRequest.body = { email: 'test@example.com', password: 'wrongpassword' };

      const mockUser = { _id: 'userId123', email: 'test@example.com', password: 'hashedpassword', type: 'student' };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await login(mockRequest, mockResponse);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedpassword');
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should handle errors during login', async () => {
      mockRequest.body = { email: 'test@example.com', password: 'password123' };

      User.findOne.mockRejectedValue(new Error('Database error'));

      await login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});
