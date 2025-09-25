import { IEmailGateway, EmailMessage, EmailResult } from '../../gateways/IEmailGateway';
import { IHttpClient } from '../../clients/IHttpClient';

export class HttpEmailGateway implements IEmailGateway {
  constructor(
    private httpClient: IHttpClient,
    private apiUrl: string,
    private apiKey: string
  ) {}

  async sendEmail(message: EmailMessage): Promise<EmailResult> {
    try {
      const response = await this.httpClient.post(
        `${this.apiUrl}/send`,
        {
          to: message.to,
          from: message.from || 'noreply@app.com',
          subject: message.subject,
          html: message.body,
        },
        {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return {
          success: true,
          messageId: response.data.id || `http-${Date.now()}`,
        };
      }

      return {
        success: false,
        error: `HTTP ${response.status}: ${response.data?.message || 'Unknown error'}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HTTP request failed',
      };
    }
  }
}