import databasesConfig from './databases.json';

export interface DatabaseConnectionConfig {
  type: 'postgres' | 'mysql' | 'mongodb' | 'sqlite';
  host: string;
  port: number;
  database: string;
  username?: string;
  password?: string;
}

export class DatabaseConfig {
  private static replaceEnvVars(value: string): string {
    return value.replace(/\$\{([^}]+)\}/g, (_, envVar) => {
      return process.env[envVar] || '';
    });
  }

  static getConfig(database: 'users' | 'contracts'): DatabaseConnectionConfig {
    const env = process.env.NODE_ENV || 'development';
    const config = databasesConfig[env as keyof typeof databasesConfig][database];
    
    // Replace environment variables in production
    if (env === 'production') {
      const processedConfig = {
        ...config,
        type: config.type as DatabaseConnectionConfig['type'],
        host: this.replaceEnvVars(config.host),
        database: this.replaceEnvVars(config.database),
        username: (config as any).username ? this.replaceEnvVars((config as any).username) : undefined,
        password: (config as any).password ? this.replaceEnvVars((config as any).password) : undefined,
      };
      
      // Convert port to number if it's a string
      if (typeof processedConfig.port === 'string') {
        processedConfig.port = parseInt(processedConfig.port, 10);
      }
      
      return processedConfig as DatabaseConnectionConfig;
    }
    
    return {
      ...config,
      type: config.type as DatabaseConnectionConfig['type']
    } as DatabaseConnectionConfig;
  }
}