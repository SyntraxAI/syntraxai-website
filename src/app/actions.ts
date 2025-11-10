"use server"; // This marks all functions in this file as Server Actions

import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit'; // Added for rate limiting
import { Redis } from '@upstash/redis'; // Added for rate limiting
import { headers } from 'next/headers'; // Added for rate limiting

// Initialize Resend with our API key
const resend = new Resend(process.env.RESEND_API_KEY);

// --- AI AUDIT FORM ---
// Only the audit form server action remains, as it's a separate lead magnet.

// 1. Define the data shape for the audit form
type AuditFormData = {
  name: string;
  email: string;
  website: string;
};

// 2. Create the new Server Action for the audit form
export async function submitAuditForm(formData: AuditFormData) {
  console.log("Received AI audit form data:", formData);

  // --- START RATE LIMITING ---
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(3, '1 m'), // 3 requests per 1 minute
      analytics: true,
    });

    // --- FIX: Added 'await' before headers() ---
    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';
    
    // --- FIX: Add eslint-disable comment for unused variables ---
    
    const { success, limit: _limit, remaining: _remaining } = await ratelimit.limit(ip);

    if (!success) {
      return { success: false, error: "Too many requests. Please try again later." };
    }
  }
  // --- END RATE LIMITING ---

  try {
    const { data, error } = await resend.emails.send({
      from: 'Syntrax AI <leads@leads.syntraxai.com>', // From your verified domain
      to: ['adriank.viloria@gmail.com'], // CHANGE THIS to your email
      subject: `New AI Audit Lead: ${formData.website}`,
      html: `
        <h1>New "AI Audit" Lead</h1>
        <p>A new user has requested a 5-minute AI audit.</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Website:</strong> ${formData.website}</p>
        <hr>
        <p>Next steps: Run the audit and email the report to this user.</p>
      `,
    });

    if (error) {
      console.error("Resend error (Audit Form):", error);
      return { success: false, error: error.message };
    }

    console.log("Audit form email sent successfully:", data);
    return { success: true };
  } catch (exception) {
    console.error("Submit audit error:", exception);
    return { success: false, error: "An unknown error occurred." };
  }
}