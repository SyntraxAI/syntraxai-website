"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { submitProjectForm } from '@/app/actions'; // Import our new Server Action

export default function ProjectIntakeForm() {
  const searchParams = useSearchParams();
  const selectedProject = searchParams.get('project') || 'Not specified';

  // Add state to manage form status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage('');

    // Get data from the form
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      project: selectedProject,
    };

    // Call our server action
    const result = await submitProjectForm(data);

    setIsSubmitting(false);
    if (result.success) {
      setFormMessage("Success! We've received your inquiry and will be in touch soon.");
      (event.target as HTMLFormElement).reset(); // Clear the form
    } else {
      setFormMessage(`Error: ${result.error || 'Failed to submit form.'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
      {/* (All the input fields are the same as before) */}
      <div className="sm:col-span-2">
        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Full name</label>
        <div className="mt-2.5">
          <input type="text" name="name" id="name" autoComplete="name" required disabled={isSubmitting} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
        <div className="mt-2.5">
          <input type="email" name="email" id="email" autoComplete="email" required disabled={isSubmitting} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">Company name</label>
        <div className="mt-2.5">
          <input type="text" name="company" id="company" autoComplete="organization" disabled={isSubmitting} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="project" className="block text-sm font-semibold leading-6 text-gray-900">Selected Project</label>
        <div className="mt-2.5">
          <input type="text" name="project" id="project" value={selectedProject} readOnly className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-400 bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-0 sm:text-sm sm:leading-6" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2">
        <button type="submit" disabled={isSubmitting} className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:bg-gray-400">
          {isSubmitting ? 'Submitting...' : 'Send Project Inquiry'}
        </button>
      </div>

      {/* Success/Error Message */}
      {formMessage && (
        <div className="sm:col-span-2 text-center text-sm">
          <p>{formMessage}</p>
        </div>
      )}
    </form>
  );
}