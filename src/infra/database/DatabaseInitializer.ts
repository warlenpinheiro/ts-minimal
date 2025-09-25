import { DatabaseManager } from './DatabaseManager';
import { UserModel } from './models/UserModel';
import { setupRelations } from './models/relations';
import { UserDatabaseConnection } from './connections/UserDatabaseConnection';

export class DatabaseInitializer {
  static async initialize(): Promise<void> {
    const repositoryType = process.env.REPOSITORY_TYPE || 'memory';
    
    if (repositoryType === 'sequelize') {
      const dbManager = DatabaseManager.getInstance();
      await dbManager.initializeConnections();
      
      // Initialize models for Users database
      const userConnection = dbManager.getConnection('users') as UserDatabaseConnection;
      UserModel.initModel(userConnection.getSequelize());
      
      // Setup relations after all models are initialized
      setupRelations();
    }
  }
}