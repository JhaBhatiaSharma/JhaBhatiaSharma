const { createComplaint, getComplaints, resolveComplaint, getMyComplaints } = require('../../controllers/complaintController');
const Complaint = require('../../models/Complaint');

// Mock dependencies
jest.mock('../../models/Complaint');

describe('Complaint Controller Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = {
      user: { id: 'testUserId', role: 'student' },
      params: {},
      body: {},
    };

    jest.clearAllMocks();
  });

  describe('createComplaint', () => {
    it('should create a complaint', async () => {
      const mockComplaint = { userId: 'testUserId', role: 'student', title: 'Issue', description: 'Details' };
      mockRequest.body = { title: 'Issue', description: 'Details' };
      Complaint.create.mockResolvedValue(mockComplaint);

      await createComplaint(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: mockComplaint });
    });

    it('should handle errors during complaint creation', async () => {
      Complaint.create.mockRejectedValue(new Error('Creation error'));

      await createComplaint(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Creation error' });
    });
  });

  describe('getComplaints', () => {
    it('should fetch all pending complaints', async () => {
        const mockComplaints = [{ title: 'Issue1', description: 'Details1' }];
        Complaint.find.mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockComplaints),
        });

        await getComplaints(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: mockComplaints });
    });

    it('should handle errors during fetching complaints', async () => {
        Complaint.find.mockReturnValue({
            populate: jest.fn().mockRejectedValue(new Error('Fetch error')),
        });

        await getComplaints(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Fetch error' });
    });
  });

  describe('resolveComplaint', () => {
    it('should resolve a complaint', async () => {
      const mockComplaint = { id: 'testComplaintId', status: 'resolved' };
      mockRequest.params = { complaintId: 'testComplaintId' };
      Complaint.findByIdAndUpdate.mockResolvedValue(mockComplaint);

      await resolveComplaint(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: mockComplaint });
    });

    it('should return 404 if complaint not found', async () => {
      mockRequest.params = { complaintId: 'nonexistentId' };
      Complaint.findByIdAndUpdate.mockResolvedValue(null);

      await resolveComplaint(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Complaint not found' });
    });

    it('should handle errors during complaint resolution', async () => {
      mockRequest.params = { complaintId: 'testComplaintId' };
      Complaint.findByIdAndUpdate.mockRejectedValue(new Error('Resolution error'));

      await resolveComplaint(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Resolution error' });
    });
  });

  describe('getMyComplaints', () => {
    it('should fetch complaints for the logged-in user', async () => {
      const mockComplaints = [{ title: 'Issue', description: 'Details', userId: 'testUserId' }];
      Complaint.find.mockResolvedValue(mockComplaints);

      await getMyComplaints(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: mockComplaints });
    });

    it('should handle errors during fetching user complaints', async () => {
      Complaint.find.mockRejectedValue(new Error('Fetch error'));

      await getMyComplaints(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Fetch error' });
    });
  });
});
