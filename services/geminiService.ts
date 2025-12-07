import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ScamAnalysisResult, Language } from "../types";

const SYSTEM_INSTRUCTION = `
You are DesiCheck, an expert Cyber Security and Fact-Checking AI specifically tuned for the Indian context. 
Your job is to analyze screenshots of text messages, emails, WhatsApp forwards, and social media posts to detect scams, phishing, misinformation, and predatory financial offers.

ANALYSIS CRITERIA:
1. Urgency: Does the message demand immediate action? (e.g., "Account blocked", "KYC pending", "Electricity cut tonight").
2. Monetary Greed: Does it offer free gifts, lottery wins, or "work from home" jobs with high pay for little work?
3. Suspicious Links: Look for shortened URLs (bit.ly), slight misspellings (hdfcc-bank.com), or unofficial domains (.xyz, .top).
4. Tone: Poor grammar, weird formatting, or "official" messages coming from personal mobile numbers (+91 9XXXX...).
5. Fear: Threats of police action, arrest, or bank account freezing.

OUTPUT FORMAT:
Return a JSON object with a verdict, risk score (0-100), and a clear explanation.
For 'translated_reason', provide the explanation in the target language requested by the prompt.
`;

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    verdict: {
      type: Type.STRING,
      enum: ["SAFE", "SCAM", "SUSPICIOUS", "UNCLEAR"],
      description: "The final safety verdict.",
    },
    confidence: {
      type: Type.STRING,
      enum: ["HIGH", "MEDIUM", "LOW"],
    },
    risk_score: {
      type: Type.INTEGER,
      description: "0 is safe, 100 is definite scam.",
    },
    reason: {
      type: Type.STRING,
      description: "Technical reason for the verdict in English.",
    },
    translated_reason: {
      type: Type.STRING,
      description: "Simple explanation for the user in the requested language.",
    },
    indicators: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of specific red flags found (e.g. 'Urgency', 'Bad Grammar').",
    },
    action: {
      type: Type.STRING,
      description: "What the user should do next.",
    },
  },
  required: ["verdict", "risk_score", "reason", "indicators", "action"],
};

export const analyzeScreenshot = async (base64Image: string, language: Language): Promise<ScamAnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: "image/jpeg",
            },
          },
          {
            text: `Analyze this screenshot for potential scams. IMPORTANT: Provide the 'translated_reason' in ${language} language. Keep it simple and easy for a non-technical person to understand.`,
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(response.text) as ScamAnalysisResult;
  } catch (error) {
    console.error("Analysis failed:", error);
    return {
      verdict: "UNCLEAR",
      confidence: "LOW",
      risk_score: 0,
      reason: "Could not process image. Please try again.",
      indicators: [],
      action: "Try uploading a clearer screenshot.",
    };
  }
};
