const { registerRecruiter, loginRecruiter, getRecruiterInterviews, getAllRecruiters } = require('../../controllers/recruiterController');
const Recruiter = require('../../models/Recruiter');
const Internship = require('../../models/Internship');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

// Mock Recruiter model
jest.mock('../../models/Recruiter', () => {
 return jest.fn().mockImplementation((data) => ({
   ...data,
   save: jest.fn().mockResolvedValue(data)
 }));
});

jest.mock('../../models/Internship', () => ({
 find: jest.fn(() => ({
   populate: jest.fn()
 }))
}));

jest.mock('../../models/User', () => ({
 find: jest.fn()
}));

describe('Recruiter Controller Tests', () => {
 let mockRequest;
 let mockResponse;
 let consoleErrorSpy;
 let consoleWarnSpy;
 let consoleLogSpy;

 beforeEach(() => {
   jest.clearAllMocks();
   process.env.JWT_SECRET = 'testSecret';
   
   consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
   consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
   consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

   mockResponse = {
     status: jest.fn().mockReturnThis(),
     json: jest.fn()
   };

   // Add findOne to Recruiter mock
   Recruiter.findOne = jest.fn();
 });

 afterEach(() => {
   consoleErrorSpy.mockRestore();
   consoleWarnSpy.mockRestore();
   consoleLogSpy.mockRestore();
 });

 describe('registerRecruiter', () => {
   it('should register a new recruiter', async () => {
     Recruiter.findOne.mockResolvedValue(null);
     bcrypt.hash.mockResolvedValue('hashedPassword');

     mockRequest = {
       body: {
         firstName: 'John',
         lastName: 'Doe',
         email: 'recruiter@company.com',
         password: 'password123',
         profile: { companyName: 'Tech Corp' }
       }
     };

     await registerRecruiter(mockRequest, mockResponse);

     expect(Recruiter.findOne).toHaveBeenCalledWith({ email: 'recruiter@company.com' });
     expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
     expect(mockResponse.status).toHaveBeenCalledWith(201);
     expect(mockResponse.json).toHaveBeenCalledWith({
       message: 'Recruiter registered successfully'
     });
   });

   it('should validate password length', async () => {
     mockRequest = {
       body: {
         firstName: 'John',
         lastName: 'Doe',
         email: 'recruiter@company.com',
         password: 'short',
         profile: { companyName: 'Tech Corp' }
       }
     };

     await registerRecruiter(mockRequest, mockResponse);

     expect(mockResponse.status).toHaveBeenCalledWith(400);
     expect(mockResponse.json).toHaveBeenCalledWith({
       message: 'Password should be at least 8 characters long'
     });
   });

   it('should not register a recruiter with existing email', async () => {
     Recruiter.findOne.mockResolvedValue({
       email: 'recruiter@company.com'
     });

     mockRequest = {
       body: {
         firstName: 'John',
         lastName: 'Doe',
         email: 'recruiter@company.com',
         password: 'password123'
       }
     };

     await registerRecruiter(mockRequest, mockResponse);

     expect(mockResponse.status).toHaveBeenCalledWith(400);
     expect(mockResponse.json).toHaveBeenCalledWith({
       message: 'Recruiter already exists'
     });
   });
 });

 describe('loginRecruiter', () => {
   it('should login a recruiter with correct credentials', async () => {
     const mockedRecruiter = {
       _id: 'mockRecruiterId',
       email: 'recruiter@company.com',
       password: 'hashedPassword',
       firstName: 'John',
       lastName: 'Doe',
       role: 'recruiter'
     };

     Recruiter.findOne.mockResolvedValue(mockedRecruiter);
     bcrypt.compare.mockResolvedValue(true);
     jwt.sign.mockReturnValue('mockToken');

     mockRequest = {
       body: {
         email: 'recruiter@company.com',
         password: 'password123'
       }
     };

     await loginRecruiter(mockRequest, mockResponse);

     expect(Recruiter.findOne).toHaveBeenCalledWith({ email: 'recruiter@company.com' });
     expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
     expect(jwt.sign).toHaveBeenCalledWith(
       { id: 'mockRecruiterId', role: 'recruiter', email: 'recruiter@company.com' },
       'testSecret',
       { expiresIn: '1d' }
     );
     expect(mockResponse.json).toHaveBeenCalledWith({
       token: 'mockToken',
       user: {
         id: 'mockRecruiterId',
         email: 'recruiter@company.com',
         role: 'recruiter',
         firstName: 'John',
         lastName: 'Doe'
       }
     });
   });

   it('should not login with incorrect credentials', async () => {
     Recruiter.findOne.mockResolvedValue({
       email: 'recruiter@company.com',
       password: 'hashedPassword'
     });
     bcrypt.compare.mockResolvedValue(false);

     mockRequest = {
       body: {
         email: 'recruiter@company.com',
         password: 'wrongpassword'
       }
     };

     await loginRecruiter(mockRequest, mockResponse);

     expect(mockResponse.status).toHaveBeenCalledWith(401);
     expect(mockResponse.json).toHaveBeenCalledWith({
       message: 'Invalid credentials'
     });
   });
 });

 describe('getRecruiterInterviews', () => {
   it('should get recruiter interviews successfully', async () => {
     const mockInternships = [{
       _id: 'internship1',
       title: 'Software Engineer Intern',
       scheduledInterviews: [{
         student: {
           firstName: 'John',
           lastName: 'Doe',
           email: 'john@example.com'
         },
         dateTime: new Date('2025-01-21'),
         status: 'Scheduled',
         meetLink: 'meet.google.com/xyz'
       }]
     }];

     Internship.find.mockReturnValue({
       populate: jest.fn().mockResolvedValue(mockInternships)
     });

     mockRequest = {
       user: { id: 'mockRecruiterId' }
     };

     await getRecruiterInterviews(mockRequest, mockResponse);

     expect(Internship.find).toHaveBeenCalledWith({ recruiter: 'mockRecruiterId' });
     expect(mockResponse.status).toHaveBeenCalledWith(200);
   });

   it('should return empty array when no interviews found', async () => {
     Internship.find.mockReturnValue({
       populate: jest.fn().mockResolvedValue([])
     });

     mockRequest = {
       user: { id: 'mockRecruiterId' }
     };

     await getRecruiterInterviews(mockRequest, mockResponse);

     expect(mockResponse.status).toHaveBeenCalledWith(200);
     expect(mockResponse.json).toHaveBeenCalledWith([]);
   });
 });

 describe('getAllRecruiters', () => {
   it('should get all recruiters successfully', async () => {
     const mockRecruiters = [
       { _id: '1', firstName: 'John', role: 'recruiter' },
       { _id: '2', firstName: 'Jane', role: 'recruiter' }
     ];

     User.find.mockResolvedValue(mockRecruiters);

     mockRequest = {
       query: {}
     };

     await getAllRecruiters(mockRequest, mockResponse);

     expect(User.find).toHaveBeenCalledWith({ role: 'recruiter' });
     expect(mockResponse.json).toHaveBeenCalledWith({
       recruiters: mockRecruiters,
       total: mockRecruiters.length
     });
   });

   it('should handle no recruiters found', async () => {
     User.find.mockResolvedValue([]);

     mockRequest = {
       query: {}
     };

     await getAllRecruiters(mockRequest, mockResponse);

     expect(mockResponse.status).toHaveBeenCalledWith(404);
     expect(mockResponse.json).toHaveBeenCalledWith({
       message: 'No recruiters found'
     });
   });
 });
});