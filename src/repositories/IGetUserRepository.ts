import { User } from '../entities/User';

export interface IGetUserRepository {
  findById(id: string): Promise<User | null>;
}