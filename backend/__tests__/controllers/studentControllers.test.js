const { registerStudent, loginStudent, getStudentInterviews, getStudentCompletedInterviews } = require('../../controllers/studentController');
const Student = require('../../models/Student');
const Internship = require('../../models/Internship');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../../models/Student');
jest.mock('../../models/Internship');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Student Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerStudent', () => {
    it('should register a new student', async () => {
      const mockedStudent = {
        _id: 'mockStudentId',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        profile: { university: 'Test University' },
        role: 'student',
        save: jest.fn().mockResolvedValue(true)
      };

      Student.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
      Student.mockImplementation(() => mockedStudent);

      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          profile: { university: 'Test University' }
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await registerStudent(req, res);

      expect(Student.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(Student).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        profile: { university: 'Test University' },
        role: 'student'
      });
      expect(mockedStudent.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Student registered successfully'
      });
    });

    it('should not register a student with existing email', async () => {
      Student.findOne = jest.fn().mockResolvedValue({
        email: 'john@example.com'
      });

      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await registerStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Student already exists'
      });
    });
  });

  describe('loginStudent', () => {
    it('should login a student with correct credentials', async () => {
      const mockedStudent = {
        _id: 'mockStudentId',
        email: 'john@example.com',
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student'
      };

      Student.findOne = jest.fn().mockResolvedValue(mockedStudent);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue('mockToken');
      process.env.JWT_SECRET = 'testSecret';

      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await loginStudent(req, res);

      expect(Student.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'mockStudentId', role: 'student', email: 'john@example.com' },
        'testSecret',
        { expiresIn: '1d' }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: 'mockToken',
        user: {
          id: 'mockStudentId',
          email: 'john@example.com',
          role: 'student',
          firstName: 'John',
          lastName: 'Doe'
        }
      });
    });

    it('should not login with incorrect credentials', async () => {
      Student.findOne = jest.fn().mockResolvedValue({
        email: 'john@example.com',
        password: 'hashedPassword'
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const req = {
        body: {
          email: 'john@example.com',
          password: 'wrongpassword'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await loginStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid credentials'
      });
    });
  });

  describe('getStudentInterviews', () => {
    it('should get student interviews successfully', async () => {
      const mockedStudent = {
        _id: 'mockStudentId',
        scheduledInterviews: [
          {
            internship: {
              title: 'Software Engineer Intern',
              company: 'Tech Corp'
            },
            dateTime: new Date('2025-01-21')
          }
        ]
      };

      const mockPopulate = jest.fn().mockResolvedValue(mockedStudent);
      Student.findById = jest.fn().mockReturnValue({
        populate: mockPopulate
      });

      const req = {
        user: { id: 'mockStudentId' }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getStudentInterviews(req, res);

      expect(Student.findById).toHaveBeenCalledWith('mockStudentId');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockedStudent.scheduledInterviews);
    });
  });

  describe('getStudentCompletedInterviews', () => {
    it('should get completed interviews successfully', async () => {
      const mockCompletedInterviews = [{
        title: 'Software Engineer Intern',
        recruiter: { companyName: 'Tech Corp' },
        scheduledInterviews: [{
          student: {
            _id: 'mockStudentId',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com'
          },
          status: 'Completed',
          dateTime: new Date('2025-01-21')
        }]
      }];

      const mockPopulate = jest.fn().mockResolvedValue(mockCompletedInterviews);
      Internship.find = jest.fn().mockReturnValue({
        populate: mockPopulate
      });

      const req = {
        user: { id: 'mockStudentId' }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getStudentCompletedInterviews(req, res);

      expect(Internship.find).toHaveBeenCalledWith({
        'scheduledInterviews.student': 'mockStudentId',
        'scheduledInterviews.status': 'Completed'
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors gracefully', async () => {
      Internship.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      const req = {
        user: { id: 'mockStudentId' }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getStudentCompletedInterviews(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to fetch completed interviews'
      });
    });
  });
});