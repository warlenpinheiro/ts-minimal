import { IDatabaseConnection } from './DatabaseConnection';
import { SequelizeConnection } from './SequelizeConnection';
import { InMemoryDatabase } from './InMemoryDatabase';

export type DatabaseType = 'sequelize' | 'memory';

export class DatabaseFactory {
  static create(type: DatabaseType): IDatabaseConnection {
    switch (type) {
      case 'sequelize':
        return new SequelizeConnection();
      case 'memory':
        return new InMemoryDatabase() as any; // Adapter pattern
      default:
        throw new Error(`Database type ${type} not supported`);
    }
  }
}