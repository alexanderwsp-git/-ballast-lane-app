const request = require('supertest');
const app = require('./index');
const sequelize = require('./models/sequelize-test'); 
const User = require('./models/user');

beforeAll(async () => {
  await sequelize.sync({ force: true }); 
});

afterAll(async () => {
  await sequelize.close(); 
});

// describe('GET /', () => {
//     it('responds with "Hello from Ballast Assessment API!"', async () => {
//         const response = await request(app).get('/');
//         expect(response.status).toBe(200);
//         expect(response.text).toBe('Hello from Ballast Assessment API!');
//     });
// });

describe('Test API endpoints', () => {
  it('should create a new user', async () => {
    
    const response = await request(app)
      .post('/users')
      .send({ name: 'John', age: 30 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John');
    expect(response.body.age).toBe(30);
  });

  it('should fetch all users', async () => {
    
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
