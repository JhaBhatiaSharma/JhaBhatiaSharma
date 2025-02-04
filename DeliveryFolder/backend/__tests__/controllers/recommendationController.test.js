const { getRecommendedInternships } = require('../../controllers/recommendationController');
const CV = require('../../models/Cv');
const Internship = require('../../models/Internship');
const { calculateSimilarity, extractSkillsFromCV } = require('../../utils/recommendationUtils');

// Mock dependencies
jest.mock('../../models/Cv');
jest.mock('../../models/Internship');
jest.mock('../../utils/recommendationUtils');

describe('Recommendation Controller Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = {
      user: { _id: 'testUserId' },
    };

    jest.clearAllMocks();
  });

  describe('getRecommendedInternships', () => {
    it('should handle errors gracefully', async () => {
      CV.findOne.mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          lean: jest.fn().mockRejectedValue(new Error('Database error')),
        })),
      }));

      await getRecommendedInternships(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error fetching recommendations',
        error: 'Database error',
      });
    });

    it('should return 404 if no CV is found', async () => {
      CV.findOne.mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          lean: jest.fn().mockResolvedValue(null),
        })),
      }));

      await getRecommendedInternships(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'No CV found. Please create a CV first.',
      });
    });
  });
});
