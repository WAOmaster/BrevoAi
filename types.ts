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

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  TEMPLATES = 'TEMPLATES',
  EDITOR = 'EDITOR',
  SETTINGS = 'SETTINGS',
  AI_GENERATOR = 'AI_GENERATOR'
}

export interface BrevoConfig {
  apiKey: string;
}