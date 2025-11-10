//
// ⬇️ PASTE THIS CODE INTO: src/app/api/chat/route.ts ⬇️
//
import { createOpenAI } from '@ai-sdk/openai'; // <-- This now matches the package.json
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

    
    const { success, limit: _limit, remaining: _remaining } = await ratelimit.limit(ip);

    if (!success) {
      return new Response('Too many messages. Please try again later.', { status: 429 });
    }
  }
  // --- END RATE LIMITING ---

  try {
    const { messages } = await req.json();

    const systemPrompt = `You are a helpful sales assistant for Syntrax AI. Your goal is to guide users to the right product and book a strategy call. Our products are in two categories: "Foundation" (one-time fees for new businesses) and "Engine" (monthly subscriptions for growth). YOUR PRIMARY GOAL: Proactively guide the user to book a call at https://calendly.com/adriank-viloria/30min. YOUR SECONDARY GOAL: If the user asks about the "AI Audit", your goal is to *convert* this request into a booked call. AI AUDIT FLOW: 1. User asks for an "AI Audit". 2. Respond: "Great. I can help with that. To provide the best insights, are you just getting started (which we call 'Foundation') or looking to grow an existing business ('Engine')?" 3. If they answer, capture their website/email: "Perfect. What is your business website and email address so I can run a preliminary check?" 4. Once you have their info, RESPOND: "Thank you. I'm noting some immediate opportunities. Let's book a free strategy call with our team to discuss your full audit and the right product for you. You can book a time here: https://calendly.com/adriank-viloria/30min" Keep all other answers concise and helpful. Be friendly and professional.`;

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