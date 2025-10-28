import { Metadata } from 'next';
import ProjectIntakeForm from '@/components/ProjectIntakeForm';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Start Your Project',
  description: 'Begin your one-time project with Syntrax AI.',
};

// This is a simple wrapper component to ensure our Client Component (the form)
// can be loaded dynamically.
function ProjectForm() {
  return <ProjectIntakeForm />;
}

export default function ProjectIntakePage() {
  return (
    <main className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Start Your Project
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          We're excited to learn more. Please fill out the form below, and
          we'll get back to you within one business day.
        </p>

        <div className="mt-10">
          {/* The <Suspense> boundary is required by React to use 
            the 'useSearchParams' hook inside our form component.
          */}
          <Suspense fallback={<div>Loading form...</div>}>
            <ProjectForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}