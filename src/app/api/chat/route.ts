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
                 Your goal is to answer questions about Syntrax AI's "Products" 
                 (which are fixed-price packages) and guide users to book a strategy call.

                 - Our "Products" are listed on the /products page. They are split into "Foundation" (one-time fee) and "Engine" (monthly subscription) categories.
                 - Key Products include: "Online Launchpad", "Start-up SEO", "Content Engine", and "PPC Growth".
                 - The main goal is to get the user to book a call.
                 - When a user is ready, guide them to the main scheduling link: https://calendly.com/adriank-viloria/30min

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