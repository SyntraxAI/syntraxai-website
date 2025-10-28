"use server"; // This marks all functions in this file as Server Actions

import { Resend } from 'resend';

// Initialize Resend with our API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the shape of the data for the simple project form
type ProjectFormData = {
  name: string;
  email: string;
  company: string;
  project: string;
};

// 1. Server Action for the SIMPLE PROJECT FORM
export async function submitProjectForm(formData: ProjectFormData) {
  console.log("Received project form data:", formData);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Syntrax AI <leads@leads.syntraxai.com>', // Must be from your verified domain
      to: ['adriank.viloria@gmail.com'], // CHANGE THIS to your email
      subject: `New "À La Carte" Project Lead: ${formData.project}`,
      html: `
        <h1>New "À La Carte" Project Inquiry</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>Project:</strong> ${formData.project}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully:", data);
    return { success: true };
  } catch (exception) {
    console.error("Submit error:", exception);
    return { success: false, error: "An unknown error occurred." };
  }
}

// Define the shape of the data for the strategy call form
type StrategyFormData = {
  name: string;
  email: string;
  company: string;
  website: string;
  monthlyBudget: string;
  keyGoal: string;
};

// 2. Server Action for the STRATEGY CALL FORM
export async function submitStrategyForm(formData: StrategyFormData) {
  console.log("Received strategy form data:", formData);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Syntrax AI <leads@leads.syntraxai.com>', // Must be from your verified domain
      to: ['you@example.com'], // CHANGE THIS to your email
      subject: `New "Growth" Lead: ${formData.company}`,
      html: `
        <h1>New "Growth" Program Lead (Strategy Call)</h1>
        <h2>Contact & Company</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>Website:</strong> ${formData.website}</p>
        <hr>
        <h2>Project Details</h2>
        <p><strong>Monthly Budget:</strong> ${formData.monthlyBudget}</p>
        <p><strong>Key Goal:</strong></p>
        <p>${formData.keyGoal}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully:", data);
    return { success: true };
  } catch (exception) {
    console.error("Submit error:", exception);
    return { success: false, error: "An unknown error occurred." };
  }
}