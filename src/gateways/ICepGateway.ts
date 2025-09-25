export interface CepData {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface ICepGateway {
  findByCep(cep: string): Promise<CepData | null>;
}