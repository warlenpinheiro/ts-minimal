import { IGetUserRepository } from '../../src/repositories/IGetUserRepository';
import { IListUsersRepository } from '../../src/repositories/IListUsersRepository';
import { ICreateUserRepository } from '../../src/repositories/ICreateUserRepository';
import { User } from '../../src/entities/User';

export class MockUserRepository implements 
  IGetUserRepository, 
  IListUsersRepository, 
  ICreateUserRepository {
  
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  clear(): void {
    this.users = [];
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}