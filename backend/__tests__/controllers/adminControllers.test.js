const { registerAdmin, loginAdmin } = require('../../controllers/adminController');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Admin Controller Tests (Mocked Database)', () => {
    // Reset all mocks before each test
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('registerAdmin', () => {
      it('should register a new admin', async () => {
        // Set up mocks
        const mockedUser = {
          _id: 'mockAdminId',
          firstName: 'Test',
          lastName: 'Admin',
          email: 'admin@test.com',
          type: 'admin',
          save: jest.fn().mockResolvedValue(true)
        };
  
        // Mock User.findOne to return null (no existing admin)
        User.findOne = jest.fn().mockResolvedValue(null);
  
        // Mock bcrypt.hash to return hashed password
        bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
  
        // Mock User constructor
        User.mockImplementation(() => mockedUser);
  
        // Mock request and response
        const req = {
          body: {
            firstName: 'Test',
            lastName: 'Admin',
            email: 'admin@test.com',
            password: 'password123'
          }
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        // Execute the controller function
        await registerAdmin(req, res);
  
        // Verify User.findOne was called correctly
        expect(User.findOne).toHaveBeenCalledWith({ 
          email: 'admin@test.com',
          type: 'admin' 
        });
  
        // Verify bcrypt.hash was called correctly
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
  
        // Verify User constructor was called with correct data
        expect(User).toHaveBeenCalledWith({
          firstName: 'Test',
          lastName: 'Admin',
          email: 'admin@test.com',
          password: 'hashedPassword',
          type: 'admin'
        });
  
        // Verify save was called
        expect(mockedUser.save).toHaveBeenCalled();
  
        // Verify response
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Admin registered successfully'
        });
      });

    it('should not register an admin with an existing email', async () => {
      // Mock finding an existing admin
      User.findOne = jest.fn().mockResolvedValue({
        email: 'admin@test.com',
        type: 'admin'
      });

      const req = {
        body: {
          firstName: 'Test',
          lastName: 'Admin',
          email: 'admin@test.com',
          password: 'password123'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await registerAdmin(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ 
        email: 'admin@test.com',
        type: 'admin' 
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Admin already exists' 
      });
    });
  });

  describe('loginAdmin', () => {
    it('should login an admin with correct credentials', async () => {
      const mockedAdmin = {
        _id: 'mockAdminId',
        email: 'admin@test.com',
        password: 'hashedPassword',
        firstName: 'Test',
        lastName: 'Admin',
        type: 'admin'
      };

      User.findOne = jest.fn().mockResolvedValue(mockedAdmin);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue('mockJwtToken');

      const req = {
        body: {
          email: 'admin@test.com',
          password: 'password123'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await loginAdmin(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ 
        email: 'admin@test.com',
        type: 'admin' 
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword'
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'mockAdminId', type: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: 'mockJwtToken',
        user: {
          id: 'mockAdminId',
          email: 'admin@test.com',
          type: 'admin',
          firstName: 'Test',
          lastName: 'Admin'
        }
      });
    });

    it('should not login an admin with incorrect credentials', async () => {
      User.findOne = jest.fn().mockResolvedValue({
        email: 'admin@test.com',
        password: 'hashedPassword',
        type: 'admin'
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const req = {
        body: {
          email: 'admin@test.com',
          password: 'wrongpassword'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await loginAdmin(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ 
        email: 'admin@test.com',
        type: 'admin' 
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongpassword',
        'hashedPassword'
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Invalid credentials' 
      });
    });
  });
});