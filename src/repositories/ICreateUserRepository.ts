import { User } from '../entities/User';

export interface ICreateUserRepository {
  save(user: User): Promise<User>;
}