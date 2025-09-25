import { Sequelize } from 'sequelize';
import { IDatabaseConnection } from '../DatabaseConnection';
import { DatabaseConfig } from '../../config/DatabaseConfig';

export class UserDatabaseConnection implements IDatabaseConnection {
  private sequelize: Sequelize;
  private connected = false;

  constructor() {
    const config = DatabaseConfig.getConfig('users');
    
    this.sequelize = new Sequelize({
      dialect: config.type as any,
      host: config.host,
      port: config.port,
      database: config.database,
      username: config.username,
      password: config.password,
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
    });
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      this.connected = true;
      console.log('✅ Users database connected');
    } catch (error) {
      console.error('❌ Users database connection failed:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.sequelize.close();
    this.connected = false;
  }

  isConnected(): boolean {
    return this.connected;
  }

  getSequelize(): Sequelize {
    return this.sequelize;
  }
}