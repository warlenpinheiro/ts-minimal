import { Request, Response, NextFunction } from 'express';
import { HealthCheckService } from '../services/HealthCheckService';
import { container } from '../container/Container';

export class ReadinessController {
  private healthCheckService: HealthCheckService;

  constructor() {
    this.healthCheckService = container.resolve<HealthCheckService>('HealthCheckService');
  }

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const healthStatus = await this.healthCheckService.execute();
      
      if (healthStatus.database.status === 'connected') {
        res.status(200).json({ status: 'ready' });
      } else {
        res.status(503).json({ status: 'not ready', reason: 'database disconnected' });
      }
    } catch (error) {
      next(error);
    }
  };
}