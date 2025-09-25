import { IEmailGateway } from '../gateways/IEmailGateway';
import { Result } from '../types/Result';
import { container } from '../container/Container';

export class SendWelcomeEmailService {
  private emailGateway: IEmailGateway;

  constructor() {
    this.emailGateway = container.resolve<IEmailGateway>('EmailGateway');
  }

  async execute(userEmail: string, userName: string): Promise<Result<string, Error>> {
    try {
      const result = await this.emailGateway.sendEmail({
        to: userEmail,
        subject: 'Bem-vindo ao nosso app!',
        body: `Olá ${userName},\n\nSeja bem-vindo ao nosso aplicativo!\n\nAtenciosamente,\nEquipe`
      });

      if (!result.success) {
        return Result.failure(new Error(result.error || 'Failed to send email'));
      }

      return Result.success(result.messageId || 'Email sent successfully');
    } catch (error) {
      return Result.failure(error instanceof Error ? error : new Error('Unknown error'));
    }
  }
}