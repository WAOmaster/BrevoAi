import { GoogleGenAI } from "@google/genai";
import { EmailTemplate } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert email marketing assistant for Sashi Perera, a Cloud Architect and Developer (iamsashi.com, appcloudpro.com).
Your goal is to generate professional, engaging, and high-quality HTML email content.
The user might ask for newsletters, client updates, sales pitches, or welcome emails.
Always output clean, inline-styled HTML suitable for email clients.
Avoid using external CSS classes; use inline 'style' attributes.
Focus on readability, modern design (using table-based layouts for compatibility if complex, or div-based for simple), and clear Calls to Action (CTAs).
When asked to generate a template, provide a JSON-compatible structure if requested, or just the HTML.
For this specific tool, the user will request either "Content generation" or "Full Template".
If the user asks for a template, always include a subject line suggestion.
`;

export const generateEmailContent = async (prompt: string, modelType: 'gemini-2.5-flash' | 'gemini-3-pro-preview' = 'gemini-2.5-flash'): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("Gemini API Key missing");

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: modelType,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "No content generated.";
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
