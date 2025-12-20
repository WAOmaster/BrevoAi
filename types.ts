export interface Sender {
  email: string;
  name: string;
}

export interface Recipient {
  email: string;
  name: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  category: 'Business' | 'Personal' | 'Newsletter' | 'AI Generated';
  description: string;
}

export interface SentEmail {
  id: string;
  timestamp: number;
  sender: Sender;
  recipient: { email: string; name: string };
  subject: string;
  htmlContent: string;
  messageId?: string;
  attachment?: Attachment[];
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  TEMPLATES = 'TEMPLATES',
  EDITOR = 'EDITOR',
  SETTINGS = 'SETTINGS',
  AI_GENERATOR = 'AI_GENERATOR',
  SENT_ITEMS = 'SENT_ITEMS'
}

export interface BrevoConfig {
  apiKey: string;
}

export interface Signature {
  id: string;
  name: string;
  content: string;
  isDefault: boolean;
}

export interface Attachment {
  name: string;
  content: string; // Base64 string
}