import { BREVO_API_URL } from '../constants';
import { Sender, Recipient, Attachment } from '../types';

interface SendEmailParams {
  apiKey: string;
  sender: Sender;
  to: Recipient[];
  subject: string;
  htmlContent: string;
  attachment?: Attachment[];
}

export const sendEmail = async ({ apiKey, sender, to, subject, htmlContent, attachment }: SendEmailParams): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  if (!apiKey) {
    return { success: false, error: 'Brevo API Key is missing. Please check Settings.' };
  }

  try {
    const body: any = {
      sender,
      to,
      subject,
      htmlContent
    };

    if (attachment && attachment.length > 0) {
      body.attachment = attachment;
    }

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Handle CORS error specifically if possible, usually it appears as a network error before this
      return { success: false, error: errorData.message || `Error ${response.status}: ${response.statusText}` };
    }

    const data = await response.json();
    return { success: true, messageId: data.messageId };

  } catch (error: any) {
    console.error('Brevo API Error:', error);
    // Common issue with client-side calls to email APIs
    if (error.message === 'Failed to fetch') {
      return { success: false, error: 'Network Error: This is likely a CORS issue. Brevo API may not support direct browser calls. Please use a proxy or disable CORS for testing.' };
    }
    return { success: false, error: error.message || 'Unknown error occurred' };
  }
};
