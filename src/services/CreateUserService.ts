import { ICreateUserRepository } from '../repositories/ICreateUserRepository';
import { User } from '../entities/User';
import { CreateUserRequestDTO } from '../dtos/CreateUserRequestDTO';
import { UserResponseDTO } from '../dtos/UserResponseDTO';
import { Result } from '../types/Result';
import { ValidationError, DatabaseError, DuplicateEmailError } from '../types/errors';
import { container } from '../container/Container';

export class CreateUserService {
  private userRepository: ICreateUserRepository;

  constructor() {
    this.userRepository = container.resolve<ICreateUserRepository>('CreateUserRepository');
  }

  async execute(requestDTO: CreateUserRequestDTO): Promise<Result<UserResponseDTO, ValidationError | DatabaseError | DuplicateEmailError>> {
    try {
      const user = User.create(requestDTO.name, requestDTO.email);
      const savedUser = await this.userRepository.save(user);
      
      const userDTO: UserResponseDTO = {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        createdAt: savedUser.createdAt.toISOString()
      };
      
      return Result.success(userDTO);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('email')) {
          return Result.failure(new DuplicateEmailError(requestDTO.email));
        }
        if (error.message.includes('Nome') || error.message.includes('Email')) {
          return Result.failure(new ValidationError(error.message));
        }
        return Result.failure(new DatabaseError(error.message));
      }
      return Result.failure(new ValidationError('Validation failed'));
    }
  }
}