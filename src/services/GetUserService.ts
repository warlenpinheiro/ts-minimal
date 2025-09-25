import { IGetUserRepository } from '../repositories/IGetUserRepository';
import { UserResponseDTO } from '../dtos/UserResponseDTO';
import { Result } from '../types/Result';
import { UserNotFoundError } from '../types/errors';
import { container } from '../container/Container';

export class GetUserService {
  private userRepository: IGetUserRepository;

  constructor() {
    this.userRepository = container.resolve<IGetUserRepository>('GetUserRepository');
  }

  async execute(id: string): Promise<Result<UserResponseDTO, UserNotFoundError>> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      return Result.failure(new UserNotFoundError(id));
    }
    
    const userDTO: UserResponseDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString()
    };
    
    return Result.success(userDTO);
  }
}