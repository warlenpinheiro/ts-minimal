import { IListUsersRepository } from '../repositories/IListUsersRepository';
import { ListUsersResponseDTO } from '../dtos/ListUsersResponseDTO';
import { UserResponseDTO } from '../dtos/UserResponseDTO';
import { container } from '../container/Container';

export class ListUsersService {
  private userRepository: IListUsersRepository;

  constructor() {
    this.userRepository = container.resolve<IListUsersRepository>('ListUsersRepository');
  }

  async execute(): Promise<ListUsersResponseDTO> {
    const users = await this.userRepository.findAll();
    
    const userDTOs: UserResponseDTO[] = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString()
    }));
    
    return { users: userDTOs };
  }
}