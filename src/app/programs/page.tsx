import { Metadata } from 'next';
import Link from 'next/link';

// SEO: Add page-specific metadata
export const metadata: Metadata = {
  title: 'Monthly Programs for Predictable, Scalable Growth',
  description: 'Comprehensive, ongoing marketing management for businesses ready to scale. We act as your full-stack growth team, powered by AI and led by expert strategists.',
};

export default function ProgramsPage() {
  // Our retainer services
  const programs = [
    "Omnichannel AI Ad Management",
    "Authority Content & SEO Program",
    "Social Media Automation & Engagement"
  ];

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Growth Programs
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Comprehensive, ongoing marketing management for businesses ready to scale. 
            We act as your full-stack growth team, powered by AI and led by expert strategists.
          </p>
        </div>

        {/* List of Programs */}
        <div className="mx-auto mt-16 max-w-2xl">
          <ul role="list" className="divide-y divide-gray-200">
            {programs.map((program) => (
              <li key={program} className="flex items-center gap-x-4 py-5">
                <svg className="h-8 w-8 flex-none text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p className="text-lg font-medium leading-6 text-gray-900">{program}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/contact/strategy-call"
            className="rounded-lg bg-green-600 px-8 py-4 text-center text-xl font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            [Book a Free Strategy Call]
          </Link>
        </div>
      </div>
    </main>
  );
}