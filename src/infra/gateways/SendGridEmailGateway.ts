import { IEmailGateway, EmailMessage, EmailResult } from '../../gateways/IEmailGateway';

export class SendGridEmailGateway implements IEmailGateway {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️  SENDGRID_API_KEY not configured');
    }
  }

  async sendEmail(message: EmailMessage): Promise<EmailResult> {
    try {
      // Simulação da integração com SendGrid
      // Em produção: usar @sendgrid/mail
      
      if (!this.apiKey) {
        throw new Error('SendGrid API key not configured');
      }

      console.log('📧 Email enviado via SendGrid:');
      console.log(`To: ${message.to}`);
      console.log(`Subject: ${message.subject}`);

      // Simular delay de API externa
      await new Promise(resolve => setTimeout(resolve, 100));

      return {
        success: true,
        messageId: `sg-${Date.now()}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'SendGrid error'
      };
    }
  }
}