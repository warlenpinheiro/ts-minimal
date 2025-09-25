import { AddressResponseDTO } from './AddressResponseDTO';

export interface UserWithAddressResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  address: AddressResponseDTO | null;
}