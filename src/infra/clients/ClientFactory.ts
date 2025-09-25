import { IHttpClient } from '../../clients/IHttpClient';
import { FetchHttpClient } from './FetchHttpClient';

export type ClientType = 'fetch';

export class ClientFactory {
  static createHttpClient(type: ClientType = 'fetch'): IHttpClient {
    switch (type) {
      case 'fetch':
        return new FetchHttpClient();
      default:
        throw new Error(`Client type ${type} not supported`);
    }
  }
}