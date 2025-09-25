import { Address } from '../entities/Address';

export interface IGetAddressRepository {
  findByUserId(userId: string): Promise<Address | null>;
}