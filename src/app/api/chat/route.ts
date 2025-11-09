//
// ⬇️ PASTE THIS CODE INTO: src/app/api/chat/route.ts ⬇️
//
import { createOpenAI } from '@ai-sdk/openai'; // <-- ⛔️ THIS IS THE CORRECTED IMPORT
import { streamText } from 'ai'; 
import { Ratelimit } from '@upstash/ratelimit'; 
import { Redis } from '@upstash/redis'; 

export const runtime = 'edge'; 

// Create the OpenAI client
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // --- START RATE LIMITING ---
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, '1 m'),
      analytics: true,
    });

    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { success, limit: _limit, remaining: _remaining } = await ratelimit.limit(ip);

    if (!success) {
      return new Response('Too many messages. Please try again later.', { status: 429 });
    }
  }
  // --- END RATE LIMITING ---

  try {
    const { messages } = await req.json();

    const systemPrompt = `You are a helpful sales assistant for Syntrax AI. ... [system prompt unchanged] ...`;

    const result = await streamText({
      model: openai('gpt-4o'), // <-- This now works
      system: systemPrompt,
      messages: messages,
    });

    return result.toTextStreamResponse();

  } catch (error: unknown) {
    console.error("Error in /api/chat:", error);
    let errorMessage = "Sorry, an error occurred. Please try again later.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(errorMessage, { status: 500 });
  }
}