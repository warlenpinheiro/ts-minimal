import { Request, Response, NextFunction } from 'express';
import { HealthCheckService } from '../services/HealthCheckService';
import { container } from '../container/Container';

export class HealthCheckController {
  private healthCheckService: HealthCheckService;

  constructor() {
    this.healthCheckService = container.resolve<HealthCheckService>('HealthCheckService');
  }

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const healthStatus = await this.healthCheckService.execute();
      
      const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
      res.status(statusCode).json(healthStatus);
    } catch (error) {
      next(error);
    }
  };
}