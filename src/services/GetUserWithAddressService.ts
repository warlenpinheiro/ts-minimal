import { IGetUserRepository } from '../repositories/IGetUserRepository';
import { IGetAddressRepository } from '../repositories/IGetAddressRepository';
import { UserWithAddressResponseDTO } from '../dtos/UserWithAddressResponseDTO';
import { Result } from '../types/Result';
import { UserNotFoundError } from '../types/errors';
import { container } from '../container/Container';

export class GetUserWithAddressService {
  private userRepository: IGetUserRepository;
  private addressRepository: IGetAddressRepository;

  constructor() {
    this.userRepository = container.resolve<IGetUserRepository>('GetUserRepository');
    this.addressRepository = container.resolve<IGetAddressRepository>('GetAddressRepository');
  }

  async execute(id: string): Promise<Result<UserWithAddressResponseDTO, UserNotFoundError>> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        return Result.failure(new UserNotFoundError(id));
      }

      const address = await this.addressRepository.findByUserId(id);

      const userWithAddressDTO: UserWithAddressResponseDTO = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        address: address ? {
          id: address.id,
          street: address.street,
          city: address.city,
          zipCode: address.zipCode,
          createdAt: address.createdAt.toISOString()
        } : null
      };

      return Result.success(userWithAddressDTO);
    } catch (error) {
      return Result.failure(new UserNotFoundError(id));
    }
  }
}