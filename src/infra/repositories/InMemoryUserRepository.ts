import { IGetUserRepository } from '../../repositories/IGetUserRepository';
import { IListUsersRepository } from '../../repositories/IListUsersRepository';
import { ICreateUserRepository } from '../../repositories/ICreateUserRepository';
import { User } from '../../entities/User';
import { InMemoryDatabase } from '../database/InMemoryDatabase';

export class InMemoryUserRepository implements 
  IGetUserRepository, 
  IListUsersRepository, 
  ICreateUserRepository {
  
  private database: InMemoryDatabase;

  constructor() {
    this.database = InMemoryDatabase.getInstance();
  }

  async findById(id: string): Promise<User | null> {
    const user = this.database.findUserById(id);
    return user || null;
  }

  async findAll(): Promise<User[]> {
    return this.database.getUsers();
  }

  async save(user: User): Promise<User> {
    this.database.saveUser(user);
    return user;
  }
}