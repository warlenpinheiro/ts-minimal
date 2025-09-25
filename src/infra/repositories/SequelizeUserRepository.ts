import { IGetUserRepository } from '../../repositories/IGetUserRepository';
import { IListUsersRepository } from '../../repositories/IListUsersRepository';
import { ICreateUserRepository } from '../../repositories/ICreateUserRepository';
import { User } from '../../entities/User';
import { UserModel } from '../database/models/UserModel';

export class SequelizeUserRepository implements 
  IGetUserRepository, 
  IListUsersRepository, 
  ICreateUserRepository {
  
  async findById(id: string): Promise<User | null> {
    const userModel = await UserModel.findByPk(id);
    if (!userModel) return null;
    
    return new User(userModel.id, userModel.name, userModel.email, userModel.createdAt);
  }

  async findAll(): Promise<User[]> {
    const userModels = await UserModel.findAll();
    return userModels.map(model => 
      new User(model.id, model.name, model.email, model.createdAt)
    );
  }

  async save(user: User): Promise<User> {
    await UserModel.create({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    return user;
  }
}