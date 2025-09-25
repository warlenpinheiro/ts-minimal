import { Router } from 'express';
import { HealthCheckController } from '../controllers/HealthCheckController';
import { ReadinessController } from '../controllers/ReadinessController';
import { container } from '../container/Container';

export const healthRouter = Router();

// Liveness probe - verifica se app está rodando
healthRouter.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime())
  });
});

// Health check completo - verifica app + dependências
healthRouter.get('/health', (req, res, next) => {
  const controller = container.cradle.healthCheckController;
  controller.handle(req, res, next);
});

// Readiness probe - verifica se app está pronto para receber tráfego
healthRouter.get('/ready', (req, res, next) => {
  const controller = container.cradle.readinessController;
  controller.handle(req, res, next);
});