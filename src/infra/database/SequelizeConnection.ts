import { Sequelize } from 'sequelize';
import { IDatabaseConnection } from './DatabaseConnection';

export class SequelizeConnection implements IDatabaseConnection {
  private sequelize: Sequelize;
  private connected = false;

  constructor() {
    const dbUrl = process.env.DATABASE_URL || 'sqlite::memory:';
    this.sequelize = new Sequelize(dbUrl, {
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
    });
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      this.connected = true;
      console.log('✅ Database connected');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
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