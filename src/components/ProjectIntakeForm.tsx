// This directive tells Next.js that this is a Client Component,
// allowing us to use interactive hooks like 'useSearchParams'.
"use client";

import { useSearchParams } from 'next/navigation';

export default function ProjectIntakeForm() {
  // This hook reads the parameters from the URL
  const searchParams = useSearchParams();
  
  // We get the 'project' value from the URL, e.g., "...?project=Website%20Launchpad"
  const selectedProject = searchParams.get('project') || 'Not specified';

  // This is a simple placeholder function.
  // In a real build, this would call our Server Action.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Form submitted! (This will be connected to the backend next)");
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
      {/* Name */}
      <div className="sm:col-span-2">
        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
          Full name
        </label>
        <div className="mt-2.5">
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            required
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Email */}
      <div className="sm:col-span-2">
        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
          Email
        </label>
        <div className="mt-2.5">
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      
      {/* Company */}
      <div className="sm:col-span-2">
        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
          Company name
        </label>
        <div className="mt-2.5">
          <input
            type="text"
            name="company"
            id="company"
            autoComplete="organization"
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Selected Project (Read-Only) */}
      <div className="sm:col-span-2">
        <label htmlFor="project" className="block text-sm font-semibold leading-6 text-gray-900">
          Selected Project
        </label>
        <div className="mt-2.5">
          <input
            type="text"
            name="project"
            id="project"
            value={selectedProject}
            readOnly
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-400 bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Send Project Inquiry
        </button>
      </div>
    </form>
  );
}