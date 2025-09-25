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
      return {
        ...config,
        host: this.replaceEnvVars(config.host),
        database: this.replaceEnvVars(config.database),
        username: config.username ? this.replaceEnvVars(config.username) : undefined,
        password: config.password ? this.replaceEnvVars(config.password) : undefined,
      };
    }
    
    return config;
  }
}