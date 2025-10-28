"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { create } from 'zustand';
import { useState } from 'react';
import { submitStrategyForm } from '@/app/actions'; // Import our new Server Action

// --- Define the data we need to collect ---
type FormInputs = {
  name: string;
  email: string;
  company: string;
  website: string;
  monthlyBudget: string;
  keyGoal: string;
};

// --- Zustand Store (UPDATED with resetForm) ---
type FormState = {
  step: number;
  formData: Partial<FormInputs>;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormInputs>) => void;
  resetForm: () => void; // Add a reset function
};

const useFormStore = create<FormState>((set) => ({
  step: 1,
  formData: {},
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ step: 1, formData: {} }), // Reset to initial state
}));

// --- Main Form Component (UPDATED with resetForm) ---
export default function StrategyCallForm() {
  const { step, nextStep, prevStep, formData, updateFormData, resetForm } = useFormStore();

  switch (step) {
    case 1:
      return <Step1 nextStep={nextStep} updateFormData={updateFormData} defaultValues={formData} />;
    case 2:
      return <Step2 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} defaultValues={formData} />;
    case 3:
      return <Step3 prevStep={prevStep} formData={formData} resetForm={resetForm} />;
    default:
      return <Step1 nextStep={nextStep} updateFormData={updateFormData} defaultValues={formData} />;
  }
}

// --- Step 1 Component (Same as before) ---
function Step1({ nextStep, updateFormData, defaultValues }: { nextStep: () => void, updateFormData: (data: Partial<FormInputs>) => void, defaultValues: Partial<FormInputs> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({ defaultValues });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Step 1: Your Information</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Full name</label>
        <input {...register("name", { required: "Name is required" })} id="name" className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600" />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
        <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} id="email" type="email" className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600" />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">Company</label>
        <input {...register("company")} id="company" className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600" />
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-semibold leading-6 text-gray-900">Website URL</label>
        <input {...register("website", { required: "Website is required" })} id="website" type="url" placeholder="https://example.com" className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600" />
        {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>}
      </div>
      <div className="flex justify-end">
        <button type="submit" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
          Next: Project Details
        </button>
      </div>
    </form>
  );
}

// --- Step 2 Component (Same as before) ---
function Step2({ nextStep, prevStep, updateFormData, defaultValues }: { nextStep: () => void, prevStep: () => void, updateFormData: (data: Partial<FormInputs>) => void, defaultValues: Partial<FormInputs> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({ defaultValues });
  const budgetOptions = ["$1,000 - $2,500", "$2,500 - $5,000", "$5,000 - $10,000", "$10,000+"];

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Step 2: Project Details</h2>
      <div>
        <label htmlFor="monthlyBudget" className="block text-sm font-semibold leading-6 text-gray-900">What is your monthly budget for this program?</label>
        <select {...register("monthlyBudget", { required: "Please select a budget" })} id="monthlyBudge" className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600">
          <option value="">Select a budget...</option>
          {budgetOptions.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
        {errors.monthlyBudget && <p className="mt-1 text-sm text-red-600">{errors.monthlyBudget.message}</p>}
      </div>
      <div>
        <label htmlFor="keyGoal" className="block text-sm font-semibold leading-6 text-gray-900">What is your primary goal?</label>
        <textarea {...register("keyGoal", { required: "Please describe your goal" })} id="keyGoal" rows={4} className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600"></textarea>
        {errors.keyGoal && <p className="mt-1 text-sm text-red-600">{errors.keyGoal.message}</p>}
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={prevStep} className="rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200">
          Back
        </button>
        <button type="submit" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
          Next: Review
        </button>
      </div>
    </form>
  );
}

// --- Step 3 Component (UPDATED with Server Action) ---
function Step3({ prevStep, formData, resetForm }: { prevStep: () => void, formData: Partial<FormInputs>, resetForm: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setFormMessage('');
    
    // Call our server action
    const result = await submitStrategyForm(formData as FormInputs);
    
    setIsSubmitting(false);
    if (result.success) {
      setFormMessage("Success! We've received your application and will be in touch soon.");
      setTimeout(resetForm, 3000); // Reset the form after 3 seconds
    } else {
      setFormMessage(`Error: ${result.error || 'Failed to submit application.'}`);
    }
  };

  // If the form has been successfully submitted, show a success message
  if (formMessage.startsWith("Success")) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-semibold text-green-600">Application Submitted!</h2>
        <p className="text-gray-700">{formMessage}</p>
        <p className="text-gray-500 text-sm">You may now close this page.</p>
      </div>
    );
  }

  // Otherwise, show the review step
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Step 3: Review Your Application</h2>
      
      <div className="divide-y divide-gray-200">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-700 capitalize">{key.replace('keyGoal', 'Key Goal').replace('monthlyBudget', 'Monthly Budget')}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value}</dd>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={prevStep} disabled={isSubmitting} className="rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 disabled:bg-gray-50">
          Back
        </button>
        <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 disabled:bg-gray-400">
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
      
      {formMessage && (
        <div className="text-center text-sm text-red-600">
          <p>{formMessage}</p>
        </div>
      )}
    </div>
  );
}