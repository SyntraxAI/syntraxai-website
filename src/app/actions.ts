"use server"; // This marks all functions in this file as Server Actions

import { Resend } from 'resend';

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