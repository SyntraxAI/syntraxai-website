import { Metadata } from 'next';

// SEO: Add page-specific metadata
export const metadata: Metadata = {
  title: 'Monthly Programs for Predictable, Scalable Growth',
  description: 'Comprehensive, ongoing marketing management for businesses ready to scale.',
};

export default function ProgramsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Monthly Programs for Predictable, Scalable Growth</h1>
      {/* Program details will go here */}
    </main>
  );
}