import { Metadata } from 'next';

// SEO: Add page-specific metadata
export const metadata: Metadata = {
  title: 'Fixed-Price Projects to Launch Your Brand',
  description: 'The essential, high-impact projects you need, delivered with precision and speed.',
};

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Fixed-Price Projects to Launch Your Brand</h1>
      {/* Project cards will go here */}
    </main>
  );
}