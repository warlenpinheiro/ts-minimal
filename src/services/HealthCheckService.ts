import { IListUsersRepository } from '../repositories/IListUsersRepository';
import { container } from '../container/Container';

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
  };
  database: {
    status: 'connected' | 'disconnected';
    responseTime?: number;
  };
}

export class HealthCheckService {
  private userRepository: IListUsersRepository;

  constructor() {
    this.userRepository = container.resolve<IListUsersRepository>('ListUsersRepository');
  }

  async execute(): Promise<HealthStatus> {
    const memoryUsage = process.memoryUsage();
    const databaseStatus = await this.checkDatabase();

    return {
      status: databaseStatus.status === 'connected' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024)
      },
      database: databaseStatus
    };
  }

  private async checkDatabase(): Promise<{ status: 'connected' | 'disconnected'; responseTime?: number }> {
    try {
      const start = Date.now();
      await this.userRepository.findAll();
      const responseTime = Date.now() - start;
      
      return {
        status: 'connected',
        responseTime
      };
    } catch {
      return {
        status: 'disconnected'
      };
    }
  }
}