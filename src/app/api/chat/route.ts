import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

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

    const result = await streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages: messages,
    });

    // --- THIS IS THE FIX ---
    // Instead of the SDK's 'toTextStreamResponse()',
    // we return the raw 'textStream' directly.
    // Our front-end 'TextDecoder' can read this.
    return new Response(result.textStream);

  } catch (error) {
    console.error("Error in /api/chat:", error);
    
    return new Response(
      "Sorry, an error occurred. Please try again later.", 
      { status: 500 }
    );
  }
}