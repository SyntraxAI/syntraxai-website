import { createOpenAI } from '@ai-sdk/openai';
// 1. We import 'generateText' instead of 'streamText'
import { generateText } from 'ai';

export const runtime = 'edge'; 

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `You are a helpful sales assistant for Syntrax AI, a digital marketing agency. 
                 Your goal is to answer questions about Syntrax AI's services (Projects, Programs, AI Solutions) 
                 and guide users towards the correct contact form.
                 - For specific one-time projects ('Website Launchpad', 'SEO Foundation', 'Email Machine'), guide them to '/contact/project-intake'.
                 - For ongoing retainers ('Growth Programs'), guide them to '/contact/strategy-call'.
                 - For custom AI solutions ('AI Accelerator'), offer to schedule a demo (we'll build this later).
                 Keep your answers concise and helpful. Be friendly and professional.`;

    // 2. We use 'generateText' to get the *full* response at once
    const { text } = await generateText({
      model: openai('gpt-4o'), // Or gpt-3.5-turbo
      system: systemPrompt,
      messages: messages,
    });

    // 3. We return the full text as a simple, non-streamed response
    return new Response(text);

  } catch (error) {
    console.error("Error in /api/chat:", error);
    
    return new Response(
      "Sorry, an error occurred. Please try again later.", 
      { status: 500 }
    );
  }
}