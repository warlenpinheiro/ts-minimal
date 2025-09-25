import { IGetUserRepository } from '../repositories/IGetUserRepository';
import { UserResponseDTO } from '../dtos/UserResponseDTO';
import { Result } from '../types/Result';
import { UserNotFoundError } from '../types/errors';

export class GetUserService {
  constructor(private getUserRepository: IGetUserRepository) {}

  async execute(id: string): Promise<Result<UserResponseDTO, UserNotFoundError>> {
    const user = await this.getUserRepository.findById(id);
    
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