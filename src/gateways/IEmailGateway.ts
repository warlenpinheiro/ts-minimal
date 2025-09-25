export interface EmailMessage {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface IEmailGateway {
  sendEmail(message: EmailMessage): Promise<EmailResult>;
}