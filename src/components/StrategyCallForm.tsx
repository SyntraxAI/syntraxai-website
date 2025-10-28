// This is a Client Component, as it's a fully interactive form.
"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { create } from 'zustand';

// --- Define the data we need to collect ---
type FormInputs = {
  name: string;
  email: string;
  company: string;
  website: string;
  monthlyBudget: string;
  keyGoal: string;
};

// --- Create a 'store' using Zustand ---
// This store will hold the data from all steps and the current step number
type FormState = {
  step: number;
  formData: Partial<FormInputs>;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormInputs>) => void;
};

const useFormStore = create<FormState>((set) => ({
  step: 1,
  formData: {},
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));

// --- Main Form Component ---
export default function StrategyCallForm() {
  const { step, nextStep, prevStep, formData, updateFormData } = useFormStore();

  switch (step) {
    case 1:
      return <Step1 nextStep={nextStep} updateFormData={updateFormData} defaultValues={formData} />;
    case 2:
      return <Step2 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} defaultValues={formData} />;
    case 3:
      return <Step3 prevStep={prevStep} formData={formData} />;
    default:
      return <div>Error</div>;
  }
}

// --- Step 1: Contact & Company Info ---
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

// --- Step 2: Project Goals & Budget ---
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
        <select {...register("monthlyBudget", { required: "Please select a budget" })} id="monthlyBudget" className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600">
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

// --- Step 3: Review & Submit ---
function Step3({ prevStep, formData }: { prevStep: () => void, formData: Partial<FormInputs> }) {
  
  const handleSubmit = () => {
    // In a real build, this data would be sent to a Server Action.
    console.log("FINAL FORM DATA:", formData);
    alert("Application submitted! We will be in touch soon.");
  };

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
        <button type="button" onClick={prevStep} className="rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200">
          Back
        </button>
        <button type="button" onClick={handleSubmit} className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700">
          Submit Application
        </button>
      </div>
    </div>
  );
}