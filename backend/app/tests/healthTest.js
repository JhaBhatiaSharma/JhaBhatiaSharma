const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../index');

describe('Health API Test', () => {
  it('should return status 200 for /api/v1/health', async () => {
    const res = await request(app)
      .get('/api/v1/health');

    expect(res.status).to.equal(200);
    expect(res.body.statusCode).to.equal("200");
    expect(res.body.message).to.equal("Server is up and running");
  });
});
