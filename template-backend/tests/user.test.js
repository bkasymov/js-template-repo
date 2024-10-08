const request = require('supertest');
const app = require('../index');
const { User } = require('../models');

describe('User API', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        googleId: '123456'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});
