import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data/products';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: 'The NOIRÉ Atelier Concierge service is currently offline (API key required).' },
        { status: 200 }
      );
    }

    const { message, conversationHistory } = await req.json();

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
You are the Chief Concierge & Private Personal Stylist for NOIRÉ ATELIER, a ultra-luxury Paris/Geneva haute horlogerie, joaillerie, leatherware, and haute parfumerie house.
Your tone is sophisticated, discrete, highly knowledgeable, polite, elegant, and bespoke (like a personal concierge at Place Vendôme or Savile Row).

Here is the current catalog of available NOIRÉ ATELIER masterpieces:
${JSON.stringify(PRODUCTS, null, 2)}

Instructions:
- Assist the client with gift advice, product recommendations, material craftsmanship details, sizing, or custom atelier requests.
- Quote prices accurately in USD ($).
- Recommend specific products from the catalog if relevant.
- Keep responses concise, elegant, and atmospheric (2-4 short sentences max unless detailed craftsmanship query is asked).
- Speak with quiet luxury confidence.
    `.trim();

    const formattedPrompt = `${systemInstruction}\n\nClient Conversation:\n${
      conversationHistory
        ? conversationHistory.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`).join('\n')
        : ''
    }\nClient: ${message}\nConcierge:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedPrompt,
    });

    const replyText = response.text || "It is my absolute pleasure to assist you at NOIRÉ ATELIER. How may I refine your selection today?";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error('Concierge API Error:', error);
    return NextResponse.json(
      { reply: 'Pardon me, our private concierge line experienced a momentary pause. May I assist you again?' },
      { status: 200 }
    );
  }
}
