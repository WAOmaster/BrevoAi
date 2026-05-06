import { GoogleGenAI } from "@google/genai";
import { EmailTemplate } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert email marketing assistant for Sashi Perera, a Cloud Architect and Developer (iamsashi.com, appcloudpro.com).
Your goal is to generate professional, engaging, and high-quality HTML email content.
The user might ask for newsletters, client updates, sales pitches, or welcome emails.

CRITICAL OUTPUT RULES:
- ALWAYS return ONLY the raw HTML string. No JSON, no markdown, no code fences, no explanation.
- Start your response directly with the HTML tag (e.g. <div> or <!DOCTYPE html>).
- Use inline 'style' attributes only — never external CSS classes.
- Use table-based layouts for complex designs, div-based for simple ones.

CRITICAL IMAGE RULES — email clients block data URIs:
- NEVER use base64-encoded images (data:image/...). They are stripped by Gmail, Outlook, and all major email clients.
- ALWAYS use https:// URLs for every <img> src attribute.
- If a profile photo URL is provided in the prompt, use it directly in <img src="...">.
- If no profile photo URL is available, omit the image entirely or use a placeholder service (e.g., https://placehold.co/80x80).
`;

function extractHtml(raw: string): string {
  let text = raw.trim();
  // Strip markdown code fences (```html ... ``` or ```json ... ``` or ``` ... ```)
  const fenceMatch = text.match(/^```(?:html|json)?\s*([\s\S]*?)```$/);
  if (fenceMatch) text = fenceMatch[1].trim();
  // If Gemini returned JSON despite instructions, pull out html_content
  if (text.startsWith('{')) {
    try {
      const parsed = JSON.parse(text);
      const html = parsed.html_content || parsed.htmlContent || parsed.html || parsed.body;
      if (html) return html;
    } catch {}
  }
  return text || "No content generated.";
}

export const generateEmailContent = async (prompt: string, profilePhotoUrl?: string, modelType: 'gemini-2.5-flash' | 'gemini-3-pro-preview' = 'gemini-2.5-flash'): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("Gemini API Key missing");

    const ai = new GoogleGenAI({ apiKey });
    
    const fullPrompt = profilePhotoUrl
      ? `${prompt}\n\nProfile photo URL to use in <img src>: ${profilePhotoUrl}`
      : prompt;

    const response = await ai.models.generateContent({
      model: modelType,
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return extractHtml(response.text || "");
  } catch (error) {
    console.error("Gemini Content Gen Error:", error);
    throw error;
  }
};

export const suggestSubjectLines = async (contentSummary: string): Promise<string[]> => {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("Gemini API Key missing");
    
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Give me 5 catchy subject lines for an email about: ${contentSummary}. Return them as a JSON array of strings.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
             responseMimeType: "application/json"
          }
        });
    
        const json = JSON.parse(response.text || "[]");
        return Array.isArray(json) ? json : [];
      } catch (error) {
        console.error("Gemini Subject Gen Error:", error);
        return ["Update from Sashi", "Important Information", "Check this out"];
      }
};
