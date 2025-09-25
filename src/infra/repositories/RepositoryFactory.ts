import { IGetUserRepository } from '../../repositories/IGetUserRepository';
import { IListUsersRepository } from '../../repositories/IListUsersRepository';
import { ICreateUserRepository } from '../../repositories/ICreateUserRepository';
import { IGetAddressRepository } from '../../repositories/IGetAddressRepository';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { SequelizeUserRepository } from './SequelizeUserRepository';
import { InMemoryAddressRepository } from './InMemoryAddressRepository';

export type RepositoryType = 'sequelize' | 'memory';

export class RepositoryFactory {
  static createGetUserRepository(type: RepositoryType): IGetUserRepository {
    return this.createUserRepository(type);
  }

  static createListUsersRepository(type: RepositoryType): IListUsersRepository {
    return this.createUserRepository(type);
  }

  static createCreateUserRepository(type: RepositoryType): ICreateUserRepository {
    return this.createUserRepository(type);
  }

  static createGetAddressRepository(type: RepositoryType): IGetAddressRepository {
    switch (type) {
      case 'sequelize':
        // TODO: Implementar SequelizeAddressRepository
        return new InMemoryAddressRepository();
      case 'memory':
        return new InMemoryAddressRepository();
      default:
        throw new Error(`Repository type ${type} not supported`);
    }
  }

  private static createUserRepository(type: RepositoryType) {
    switch (type) {
      case 'sequelize':
        return new SequelizeUserRepository();
      case 'memory':
        return new InMemoryUserRepository();
      default:
        throw new Error(`Repository type ${type} not supported`);
    }
  }
}