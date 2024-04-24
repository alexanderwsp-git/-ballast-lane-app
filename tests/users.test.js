const request = require('supertest');
const app = require('../index'); // Import the Express app (optional)
const User = require('../models/user');

describe('Users API', () => {
  beforeAll(async () => {
    await User.sync({ force: true }); // Reset database for each test run
  });

  afterAll(async () => {
    await User.truncate(); // Clean up database after tests
  });

  describe('GET Global /', () => {
    it('should return the Ballast API', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Hello from Ballast Assessment API!');
    });

    it('should return OK for the health check', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('OK!');
    });
  });

  describe('GET /users', () => {
    it('should return an empty list of users', async () => {
      const response = await request(app).get('/users');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'John Doe',
        age: 30,
      };
      const response = await request(app).post('/users').send(newUser);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.age).toBe(newUser.age);

      // Optional: Verify user creation in database
      const createdUser = await User.findByPk(response.body.id);
      expect(createdUser).not.toBeNull();
    });

    it('should return an error for invalid data', async () => {
      const invalidUser = { age: 30 }; // Missing name
      const response = await request(app).post('/users').send(invalidUser);
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });
});
