const { getConfigurations, updateConfiguration } = require('../../controllers/configurationController');
const Configuration = require('../../models/Configuration');

// Mock dependencies
jest.mock('../../models/Configuration');

describe('Configuration Controller Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = {
      params: {},
      body: {},
    };

    jest.clearAllMocks();
  });

  describe('getConfigurations', () => {
    it('should fetch all configurations and format them', async () => {
      const mockConfigurations = [
        { type: 'config1', value: 'value1' },
        { type: 'config2', value: 'value2' },
      ];
      Configuration.find.mockResolvedValue(mockConfigurations);

      await getConfigurations(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        config1: 'value1',
        config2: 'value2',
      });
    });

    it('should handle errors when fetching configurations', async () => {
      Configuration.find.mockRejectedValue(new Error('Database error'));

      await getConfigurations(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Failed to fetch configurations.' });
    });
  });

  describe('updateConfiguration', () => {
    it('should update an existing configuration', async () => {
      const mockConfig = { type: 'config1', value: 'newValue' };
      mockRequest.params = { type: 'config1' };
      mockRequest.body = { value: 'newValue' };

      Configuration.findOneAndUpdate.mockResolvedValue(mockConfig);

      await updateConfiguration(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        configuration: mockConfig,
      });
    });

    it('should create a new configuration if not existing', async () => {
      const mockConfig = { type: 'newConfig', value: 'defaultValue' };
      mockRequest.params = { type: 'newConfig' };
      mockRequest.body = { value: 'defaultValue' };

      Configuration.findOneAndUpdate.mockResolvedValue(mockConfig);

      await updateConfiguration(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        configuration: mockConfig,
      });
    });

    it('should handle errors when updating configuration', async () => {
      mockRequest.params = { type: 'config1' };
      mockRequest.body = { value: 'newValue' };
      Configuration.findOneAndUpdate.mockRejectedValue(new Error('Update error'));

      await updateConfiguration(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Failed to update configuration.' });
    });
  });
});
