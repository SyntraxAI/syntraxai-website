"use client";

import { useState } from 'react';
import { submitAuditForm } from '@/app/actions'; // We will create this next

export default function AIAuditForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage('');
    setFormStatus('idle');

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      website: formData.get('website') as string,
    };

    // Call our new server action
    const result = await submitAuditForm(data);

    setIsSubmitting(false);
    if (result.success) {
      setFormStatus('success');
      setFormMessage("Success! Your audit is on its way. Please check your inbox in 5-10 minutes.");
      (event.target as HTMLFormElement).reset();
    } else {
      setFormStatus('error');
      setFormMessage(`Error: ${result.error || 'Failed to submit form.'}`);
    }
  };

  // If the form has been successfully submitted, show a success message
  if (formStatus === 'success') {
    return (
      <div className="space-y-6 text-center py-10">
        <h2 className="text-2xl font-semibold text-green-600">Audit Requested!</h2>
        <p className="text-gray-700">{formMessage}</p>
      </div>
    );
  }

  // Otherwise, show the form
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
          Full name
        </label>
        <div className="mt-2.5">
          <input
            type="text" name="name" id="name" autoComplete="name"
            required disabled={isSubmitting}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
          Email
        </label>
        <div className="mt-2.5">
          <input
            type="email" name="email" id="email" autoComplete="email"
            required disabled={isSubmitting}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      
      {/* Website URL */}
      <div>
        <label htmlFor="website" className="block text-sm font-semibold leading-6 text-gray-900">
          Website URL
        </label>
        <div className="mt-2.5">
          <input
            type="url" name="website" id="website" autoComplete="url"
            required disabled={isSubmitting} placeholder="https://yourwebsite.com"
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Running Audit...' : 'Get My Free Report'}
        </button>
      </div>

      {/* Error Message */}
      {formStatus === 'error' && (
        <div className="text-center text-sm text-red-600">
          <p>{formMessage}</p>
        </div>
      )}
    </form>
  );
}