const { getUsageStatistics, getUserAnalytics, generateReportPDF } = require('../../controllers/reportController');
const UsageLog = require('../../models/UsageLog');
const User = require('../../models/User');
const PDFDocument = require('pdfkit');

// Mock dependencies
jest.mock('../../models/UsageLog');
jest.mock('../../models/User');
jest.mock('pdfkit');

describe('Report Controller Tests', () => {
  let mockRequest;
  let mockResponse;
  let consoleErrorSpy;
  let consoleLogSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = {};
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  describe('getUsageStatistics', () => {
    it('should fetch usage statistics successfully', async () => {
      const mockTotalRequests = 100;
      const mockRequestsByEndpoint = [
        { _id: '/api/login', count: 50 },
        { _id: '/api/register', count: 30 }
      ];

      UsageLog.countDocuments.mockResolvedValue(mockTotalRequests);
      UsageLog.aggregate.mockResolvedValue(mockRequestsByEndpoint);

      await getUsageStatistics(mockRequest, mockResponse);

      expect(UsageLog.countDocuments).toHaveBeenCalled();
      expect(UsageLog.aggregate).toHaveBeenCalledWith([
        { $group: { _id: '$endpoint', count: { $sum: 1 } } }
      ]);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        totalRequests: mockTotalRequests,
        requestsByEndpoint: mockRequestsByEndpoint
      });
    });

    it('should handle errors when fetching usage statistics', async () => {
      const error = new Error('Database error');
      UsageLog.countDocuments.mockRejectedValue(error);

      await getUsageStatistics(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch usage statistics.'
      });
    });
  });

  describe('getUserAnalytics', () => {
    it('should fetch user analytics successfully', async () => {
      const mockTotalUsers = 1000;
      const mockActiveUsers = ['user1', 'user2'];
      const mockUserGrowth = [
        { _id: '2025-01-20', count: 10 },
        { _id: '2025-01-21', count: 15 }
      ];

      User.countDocuments.mockResolvedValue(mockTotalUsers);
      UsageLog.distinct.mockResolvedValue(mockActiveUsers);
      User.aggregate.mockResolvedValue(mockUserGrowth);

      await getUserAnalytics(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        totalUsers: mockTotalUsers,
        activeUsers: mockActiveUsers.length,
        userGrowth: mockUserGrowth
      });
    });

    it('should handle errors when fetching user analytics', async () => {
      const error = new Error('Database error');
      User.countDocuments.mockRejectedValue(error);

      await getUserAnalytics(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch user analytics.'
      });
    });
  });

  describe('generateReportPDF', () => {
    let buffers;
    let mockPDFDoc;

    beforeEach(() => {
      buffers = [];
      mockPDFDoc = {
        on: jest.fn(),
        text: jest.fn(),
        end: jest.fn()
      };

      // Create success scenario by default
      mockPDFDoc.on.mockImplementation((event, callback) => {
        if (event === 'data') {
          callback(Buffer.from('test data'));
        }
        if (event === 'end') {
          setTimeout(callback, 0); // Execute callback on next tick
        }
        return mockPDFDoc;
      });

      PDFDocument.mockImplementation(() => mockPDFDoc);
    });

    it('should generate usage statistics report', async () => {
      const result = await generateReportPDF('usage-statistics');

      expect(mockPDFDoc.text).toHaveBeenCalledWith('Usage Statistics Report\n\n');
      expect(mockPDFDoc.text).toHaveBeenCalledWith('Total Requests: 500');
      expect(mockPDFDoc.end).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Buffer);
    }, 10000); // Increased timeout

    it('should generate user analytics report', async () => {
      const result = await generateReportPDF('user-analytics');

      expect(mockPDFDoc.text).toHaveBeenCalledWith('User Analytics Report\n\n');
      expect(mockPDFDoc.text).toHaveBeenCalledWith('Total Users: 1000');
      expect(mockPDFDoc.end).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Buffer);
    }, 10000); // Increased timeout

    it('should handle invalid report type', async () => {
      const result = await generateReportPDF('invalid-type');

      expect(mockPDFDoc.text).toHaveBeenCalledWith('Invalid Report Type');
      expect(mockPDFDoc.end).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Buffer);
    }, 10000); // Increased timeout

    it('should handle PDF generation errors', async () => {
      // Mock error scenario
      mockPDFDoc.on.mockImplementation((event, callback) => {
        if (event === 'error') {
          setTimeout(() => callback(new Error('PDF generation failed')), 0);
        }
        return mockPDFDoc;
      });

      await expect(generateReportPDF('usage-statistics'))
        .rejects
        .toThrow('PDF generation failed');
    });
  });
});