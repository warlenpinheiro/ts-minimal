import { IGetAddressRepository } from '../../repositories/IGetAddressRepository';
import { Address } from '../../entities/Address';

export class InMemoryAddressRepository implements IGetAddressRepository {
  private addresses: Address[] = [
    // Mock data para demonstração
    new Address('1', '1', 'Rua das Flores, 123', 'São Paulo', '01234-567'),
    new Address('2', '2', 'Av. Paulista, 456', 'São Paulo', '01310-100')
  ];

  async findByUserId(userId: string): Promise<Address | null> {
    return this.addresses.find(address => address.userId === userId) || null;
  }
}