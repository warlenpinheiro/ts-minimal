import { ICepGateway } from '../gateways/ICepGateway';
import { Address } from '../entities/Address';
import { Result } from '../types/Result';
import { container } from '../container/Container';

export class CreateAddressFromCepService {
  private cepGateway: ICepGateway;

  constructor() {
    this.cepGateway = container.resolve<ICepGateway>('CepGateway');
  }

  async execute(userId: string, cep: string): Promise<Result<Address, Error>> {
    try {
      const cepData = await this.cepGateway.findByCep(cep);
      
      if (!cepData) {
        return Result.failure(new Error('CEP não encontrado'));
      }

      const address = Address.create(
        userId,
        cepData.street,
        cepData.city,
        cepData.cep
      );

      return Result.success(address);
    } catch (error) {
      return Result.failure(error instanceof Error ? error : new Error('Unknown error'));
    }
  }
}