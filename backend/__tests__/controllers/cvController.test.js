const { createOrUpdateCV, getCV, deleteCV, updateVisibility } = require('../../controllers/cvController');
const CV = require('../../models/Cv');

// Mock dependencies
jest.mock('../../models/Cv');

describe('CV Controller Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = {
      user: { id: 'testUserId' },
      body: {},
      params: {},
    };

    jest.clearAllMocks();
  });

  describe('createOrUpdateCV', () => {
    it('should create a new CV', async () => {
      mockRequest.body = { template: 'template1', data: { key: 'value' }, visibility: ['company1'] };
      CV.findOne.mockResolvedValue(null);
      CV.prototype.save = jest.fn().mockResolvedValue({});

      await createOrUpdateCV(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'CV created successfully' }));
    });

    it('should update an existing CV', async () => {
      const existingCV = { save: jest.fn(), template: 'oldTemplate', data: {}, visibility: [] };
      CV.findOne.mockResolvedValue(existingCV);

      mockRequest.body = { template: 'newTemplate', data: { updated: true }, visibility: ['company2'] };

      await createOrUpdateCV(mockRequest, mockResponse);
      expect(existingCV.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'CV updated successfully' }));
    });
  });

  describe('getCV', () => {
    it('should return the user\'s CV', async () => {
      const mockCV = { template: 'template1', data: { key: 'value' }, visibility: ['company1'] };
      CV.findOne.mockResolvedValue(mockCV);

      await getCV(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCV);
    });

    it('should return 404 if no CV is found', async () => {
      CV.findOne.mockResolvedValue(null);

      await getCV(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'CV not found' });
    });
  });

  describe('deleteCV', () => {
    it('should delete the user\'s CV', async () => {
      const mockCV = { template: 'template1' };
      CV.findOneAndDelete.mockResolvedValue(mockCV);

      await deleteCV(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'CV deleted successfully' });
    });

    it('should return 404 if no CV is found', async () => {
      CV.findOneAndDelete.mockResolvedValue(null);

      await deleteCV(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'CV not found' });
    });
  });

  describe('updateVisibility', () => {
    it('should update the visibility of a CV', async () => {
      const updatedCV = { visibility: ['company1', 'company2'] };
      mockRequest.body = { cvId: 'testCvId', companyIds: ['company1', 'company2'] };
      CV.findByIdAndUpdate.mockResolvedValue(updatedCV);

      await updateVisibility(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedCV);
    });

    it('should return 500 if update fails', async () => {
      CV.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      await updateVisibility(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to update CV visibility.' });
    });
  });
});
