import { IDatabaseConnection } from './DatabaseConnection';
import { UserDatabaseConnection } from './connections/UserDatabaseConnection';
import { ContractDatabaseConnection } from './connections/ContractDatabaseConnection';

export class DatabaseManager {
  private static instance: DatabaseManager;
  private connections: Map<string, IDatabaseConnection> = new Map();

  private constructor() {}

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async initializeConnections(): Promise<void> {
    // Initialize Users database
    const userConnection = new UserDatabaseConnection();
    await userConnection.connect();
    this.connections.set('users', userConnection);

    // Initialize Contracts database
    const contractConnection = new ContractDatabaseConnection();
    await contractConnection.connect();
    this.connections.set('contracts', contractConnection);
  }

  getConnection(database: 'users' | 'contracts'): IDatabaseConnection {
    const connection = this.connections.get(database);
    if (!connection) {
      throw new Error(`Database connection '${database}' not found`);
    }
    return connection;
  }

  async disconnectAll(): Promise<void> {
    for (const connection of this.connections.values()) {
      await connection.disconnect();
    }
    this.connections.clear();
  }
}