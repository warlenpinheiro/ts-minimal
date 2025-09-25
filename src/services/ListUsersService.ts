import { IListUsersRepository } from '../repositories/IListUsersRepository';
import { ListUsersResponseDTO } from '../dtos/ListUsersResponseDTO';
import { UserResponseDTO } from '../dtos/UserResponseDTO';

export class ListUsersService {
  constructor(private listUsersRepository: IListUsersRepository) {}

  async execute(): Promise<ListUsersResponseDTO> {
    const users = await this.listUsersRepository.findAll();
    
    const userDTOs: UserResponseDTO[] = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString()
    }));
    
    return { users: userDTOs };
  }
}