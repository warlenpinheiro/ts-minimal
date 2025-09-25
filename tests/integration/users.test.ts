import request from 'supertest';
import express from 'express';
import { usersRouter } from '../../src/routes/users';
import { setupContainer } from '../../src/container/setup';
import { errorHandler } from '../../src/middleware/errorHandler';

describe('Users API', () => {
  let app: express.Application;

  beforeAll(() => {
    process.env.REPOSITORY_TYPE = 'memory';
    setupContainer();
    
    app = express();
    app.use(express.json());
    app.use('/users', usersRouter);
    app.use(errorHandler);
  });

  describe('POST /users', () => {
    it('should create user successfully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      const response = await request(app)
        .post('/users')
        .send(userData)
        .expect(201);

      expect(response.body.data).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com'
      });
      expect(response.body.data.id).toBeDefined();
    });

    it('should return validation error for invalid data', async () => {
      const userData = {
        name: '',
        email: 'invalid-email'
      };

      const response = await request(app)
        .post('/users')
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe('Validation error');
      expect(response.body.details).toBeDefined();
    });
  });

  describe('GET /users', () => {
    it('should return list of users', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200);

      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe('GET /users/:id', () => {
    it('should return user when found', async () => {
      // First create a user
      const createResponse = await request(app)
        .post('/users')
        .send({ name: 'Jane Doe', email: 'jane@example.com' });

      const userId = createResponse.body.data.id;

      const response = await request(app)
        .get(`/users/${userId}`)
        .expect(200);

      expect(response.body.data.id).toBe(userId);
      expect(response.body.data.name).toBe('Jane Doe');
    });

    it('should return 404 when user not found', async () => {
      const response = await request(app)
        .get('/users/999')
        .expect(404);

      expect(response.body.error).toContain('not found');
    });
  });
});