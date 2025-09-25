import request from 'supertest';
import express from 'express';
import { healthRouter } from '../../src/routes/health';
import { setupContainer } from '../../src/container/setup';

describe('Health API', () => {
  let app: express.Application;

  beforeAll(() => {
    process.env.REPOSITORY_TYPE = 'memory';
    setupContainer();
    
    app = express();
    app.use('/health', healthRouter);
  });

  describe('GET /health', () => {
    it('should return basic health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'ok',
        timestamp: expect.any(String),
        uptime: expect.any(Number)
      });
    });
  });

  describe('GET /health/health', () => {
    it('should return detailed health status', async () => {
      const response = await request(app)
        .get('/health/health')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'healthy',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        memory: {
          used: expect.any(Number),
          total: expect.any(Number)
        },
        database: {
          status: 'connected',
          responseTime: expect.any(Number)
        }
      });
    });
  });

  describe('GET /health/ready', () => {
    it('should return readiness status', async () => {
      const response = await request(app)
        .get('/health/ready')
        .expect(200);

      expect(response.body.status).toBe('ready');
    });
  });
});