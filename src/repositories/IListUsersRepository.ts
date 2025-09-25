import { User } from '../entities/User';

export interface IListUsersRepository {
  findAll(): Promise<User[]>;
}