import { ICepGateway, CepData } from '../../gateways/ICepGateway';
import { IHttpClient } from '../../clients/IHttpClient';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export class ViaCepGateway implements ICepGateway {
  private baseUrl = 'https://viacep.com.br/ws';

  constructor(private httpClient: IHttpClient) {}

  async findByCep(cep: string): Promise<CepData | null> {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      
      if (cleanCep.length !== 8) {
        return null;
      }

      const response = await this.httpClient.get<ViaCepResponse>(
        `${this.baseUrl}/${cleanCep}/json/`
      );

      if (response.status !== 200 || response.data.erro) {
        return null;
      }

      return {
        cep: response.data.cep,
        street: response.data.logradouro,
        neighborhood: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf,
      };
    } catch (error) {
      console.warn('Failed to fetch CEP:', error);
      return null;
    }
  }
}