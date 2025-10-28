import { Metadata } from 'next';

// SEO: Add page-specific metadata
export const metadata: Metadata = {
  title: 'Deploy Your 24/7 AI-Powered Workforce',
  description: 'Go beyond marketing. We build custom AI solutions that integrate directly into your business.',
};

export default function AISolutionsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Deploy Your 24/7 AI-Powered Workforce</h1>
      {/* AI solution details will go here */}
    </main>
  );
}