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

// Body-only content for themed templates (wrap via theme in Composer)
export const THEMED_TEMPLATES: (import('./types').EmailTemplate & { themeId: string })[] = [
  {
    id: 'tpl_interview_followup',
    name: 'Interview Thank You',
    subject: 'Thank You for the Interview — [Job Title]',
    category: 'Personal',
    description: 'Post-interview thank-you note. Use with Sashi Classic theme.',
    themeId: 'sashi-classic',
    htmlContent: `
<p>Dear [Interviewer Name],</p>
<p>Thank you for taking the time to speak with me about the <strong>[Job Title]</strong> position at <strong>[Company Name]</strong>. I thoroughly enjoyed our conversation and learning more about the team's work.</p>
<p>The discussion around [specific topic from interview] reinforced my enthusiasm for this opportunity. I'm confident my background in cloud architecture and development would be a strong fit for your goals.</p>
<p>Please don't hesitate to reach out if you need any additional information. I look forward to hearing about the next steps.</p>
<p>Best regards,<br/><strong>Sashi Perera</strong></p>
    `.trim(),
  },
  {
    id: 'tpl_missed_interview',
    name: 'Missed Interview Follow-Up',
    subject: 'Following Up on Our Scheduled Interview',
    category: 'Personal',
    description: 'Professional follow-up when an interview did not proceed.',
    themeId: 'sashi-classic',
    htmlContent: `
<p>Hi [Interviewer Name],</p>
<p>I'm writing to follow up on our scheduled interview for the <strong>[Job Title]</strong> position, which was set for <strong>[Date &amp; Time]</strong>.</p>
<p>I was logged in at the scheduled time but the interview did not proceed. Could you let me know if there was a change in schedule or what the next steps might be? I am flexible and happy to reschedule at your earliest convenience.</p>
<p>Thank you for your time and consideration.</p>
<p>Best regards,<br/><strong>Sashi Perera</strong></p>
    `.trim(),
  },
  {
    id: 'tpl_client_proposal',
    name: 'Client Project Proposal',
    subject: 'Project Proposal — Cloud Architecture for [Client Name]',
    category: 'Business',
    description: 'Professional project proposal for App Cloud Pro clients.',
    themeId: 'appcloudpro',
    htmlContent: `
<p>Dear [Client Name],</p>
<p>Thank you for the opportunity to present this proposal for <strong>[Project Name]</strong>. Based on our discovery call, I've outlined a tailored solution to meet your requirements.</p>
<h3 style="color:#1d4ed8; margin:20px 0 8px;">Proposed Scope</h3>
<ul style="padding-left:20px; color:#334155; line-height:1.8;">
  <li>[Deliverable 1]</li>
  <li>[Deliverable 2]</li>
  <li>[Deliverable 3]</li>
</ul>
<h3 style="color:#1d4ed8; margin:20px 0 8px;">Timeline &amp; Investment</h3>
<p><strong>Estimated Timeline:</strong> [X weeks]<br/><strong>Investment:</strong> [Amount]</p>
<p>I'm available to discuss this further at your convenience. Let's build something great together.</p>
<p>Best regards,<br/><strong>Sashi Perera</strong><br/>App Cloud Pro</p>
    `.trim(),
  },
];

export const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
