const {
    addInternship,
    applyToInternship,
  } = require('../../controllers/internshipController');
  const Internship = require('../../models/Internship');
  
  jest.mock('../../models/Internship');
  
  describe('Internship Controller Tests', () => {
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
      };
  
      jest.clearAllMocks();
    });
  
    describe('addInternship', () => {
      it('should add a new internship successfully', async () => {
        mockRequest.body = {
          title: 'Software Engineer Intern',
          description: 'Exciting projects',
          location: 'Remote',
          duration: '6',
          stipend: '1000',
          requiredSkills: ['JavaScript'],
        };
        mockRequest.user.id = 'recruiterId';
  
        const mockInternship = {
          ...mockRequest.body,
          recruiter: 'recruiterId',
          save: jest.fn(),
        };
  
        Internship.mockImplementation(() => mockInternship);
  
        await addInternship(mockRequest, mockResponse);
  
        expect(mockInternship.save).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockInternship);
      });
    });
  
    describe('applyToInternship', () => {
      it('should return 404 if internship is not found', async () => {
        mockRequest.params.id = 'internshipId';
        Internship.findById.mockResolvedValue(null);
  
        await applyToInternship(mockRequest, mockResponse);
  
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internship not found' });
      });
    });
  });
  