import { IEmailGateway } from '../../gateways/IEmailGateway';
import { ConsoleEmailGateway } from './ConsoleEmailGateway';
import { SendGridEmailGateway } from './SendGridEmailGateway';

export type GatewayType = 'console' | 'sendgrid';

export class GatewayFactory {
  static createEmailGateway(type: GatewayType): IEmailGateway {
    switch (type) {
      case 'console':
        return new ConsoleEmailGateway();
      case 'sendgrid':
        return new SendGridEmailGateway();
      default:
        throw new Error(`Gateway type ${type} not supported`);
    }
  }
}