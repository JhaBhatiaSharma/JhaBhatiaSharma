const { registerAdmin, loginAdmin } = require('../../controllers/adminController');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Admin Controller Tests (Mocked Database)', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      process.env.JWT_SECRET = 'testSecret';
    });
  
    describe('registerAdmin', () => {
      it('should register a new admin', async () => {
        const mockedUser = {
          _id: 'mockAdminId',
          firstName: 'Test',
          lastName: 'Admin',
          email: 'admin@test.com',
          role: 'admin',
          save: jest.fn().mockResolvedValue(true)
        };
  
        User.findOne = jest.fn().mockResolvedValue(null);
        bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
        User.mockImplementation(() => mockedUser);
  
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
          role: 'admin' 
        });
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(User).toHaveBeenCalledWith({
          firstName: 'Test',
          lastName: 'Admin',
          email: 'admin@test.com',
          password: 'hashedPassword',
          role: 'admin'
        });
        expect(mockedUser.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Admin registered successfully'
        });
      });

      it('should validate password length', async () => {
        const req = {
          body: {
            firstName: 'Test',
            lastName: 'Admin',
            email: 'admin@test.com',
            password: 'short'
          }
        };

        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };

        await registerAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Password should be at least 8 characters long'
        });
      });

      it('should not register an admin with an existing email', async () => {
        User.findOne = jest.fn().mockResolvedValue({
          email: 'admin@test.com',
          role: 'admin'
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
          role: 'admin' 
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
          role: 'admin'
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
          role: 'admin' 
        });
        expect(bcrypt.compare).toHaveBeenCalledWith(
          'password123',
          'hashedPassword'
        );
        expect(jwt.sign).toHaveBeenCalledWith(
          { id: 'mockAdminId', role: 'admin', email: 'admin@test.com' },
          'testSecret',
          { expiresIn: '1d' }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          token: 'mockJwtToken',
          user: {
            id: 'mockAdminId',
            email: 'admin@test.com',
            role: 'admin',
            firstName: 'Test',
            lastName: 'Admin'
          }
        });
      });

      it('should not login an admin with incorrect credentials', async () => {
        User.findOne = jest.fn().mockResolvedValue({
          email: 'admin@test.com',
          password: 'hashedPassword',
          role: 'admin'
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
          role: 'admin' 
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