import { IEmailGateway, EmailMessage, EmailResult } from '../../gateways/IEmailGateway';

export class ConsoleEmailGateway implements IEmailGateway {
  async sendEmail(message: EmailMessage): Promise<EmailResult> {
    try {
      console.log('📧 Email enviado via Console:');
      console.log(`From: ${message.from || 'noreply@app.com'}`);
      console.log(`To: ${message.to}`);
      console.log(`Subject: ${message.subject}`);
      console.log(`Body: ${message.body}`);
      console.log('---');

      return {
        success: true,
        messageId: `console-${Date.now()}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}