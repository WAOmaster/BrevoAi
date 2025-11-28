import { Sender, EmailTemplate } from './types';

export const SENDERS: Sender[] = [
  { email: 'hello@iamsashi.com', name: 'Sashi Perera' },
  { email: 'hello@appcloudpro.com', name: 'App Cloud Pro' },
];

export const INITIAL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl_welcome',
    name: 'Welcome to App Cloud Pro',
    subject: 'Welcome to the future of cloud apps 🚀',
    category: 'Business',
    description: 'A professional welcome email for new clients.',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h1 style="color: #2563eb;">Welcome to App Cloud Pro</h1>
        <p>Hi there,</p>
        <p>Thank you for joining us. We are dedicated to building scalable, high-performance web applications tailored to your needs.</p>
        <p>Feel free to reply to this email if you have any questions about our services.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>The App Cloud Pro Team</strong></p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <small style="color: #888;">Visit us at <a href="https://www.appcloudpro.com" style="color: #2563eb;">appcloudpro.com</a></small>
      </div>
    `
  },
  {
    id: 'tpl_personal_update',
    name: 'Personal Update from Sashi',
    subject: 'A quick update from my side',
    category: 'Personal',
    description: 'Casual update email for network and friends.',
    htmlContent: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
        <h2 style="color: #0f172a;">Hello Friend,</h2>
        <p>It's Sashi here! I wanted to share some exciting news about my latest projects in AI and cloud development.</p>
        <p>I've been working on integrating Gemini AI into practical workflows, and the results are amazing.</p>
        <p>Check out my latest work on <a href="https://github.com/WAOmaster" style="color: #4f46e5; font-weight: bold;">GitHub</a> or connect with me on <a href="https://www.linkedin.com/in/sashiperera/" style="color: #0077b5; font-weight: bold;">LinkedIn</a>.</p>
        <br/>
        <p>Cheers,</p>
        <p><strong>Sashi Perera</strong><br/><a href="https://www.iamsashi.com" style="color: #6b7280; text-decoration: none;">www.iamsashi.com</a></p>
      </div>
    `
  }
];

export const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
