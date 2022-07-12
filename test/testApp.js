const request = require('supertest');
const { app } = require('../src/app.js');

describe('Not Found', () => {
  it('should send not found respose with associated status code', (done) => {
    request(app())
      .get('/hello')
      .expect('content-type', 'text/plain')
      .expect('/hello Not Found')
      .expect(404, done);
  });
});
