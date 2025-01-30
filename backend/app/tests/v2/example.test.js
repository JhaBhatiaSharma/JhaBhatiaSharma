const request = require('supertest');
const app = require('../app'); // Replace with your app's entry point

describe('GET /health', () => {
  it('should return a 200 status and message', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Server is healthy');
  });
});
