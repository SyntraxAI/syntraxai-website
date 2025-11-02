import { Metadata } from 'next';
import AIAuditForm from '@/components/AIAuditForm'; // We will create this next

export const metadata: Metadata = {
  title: 'Free 5-Minute AI Audit',
  description: 'Find the 3 biggest revenue leaks on your website with our free, automated AI audit.',
};

export default function AiAuditPage() {
  return (
    <main className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            The 5-Minute AI Audit
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find the 3 biggest revenue leaks on your website. 
            Our AI will scan your site for critical SEO, performance, and 
            conversion flaws. Get your free, automated report sent 
            straight to your inbox.
          </p>
        </div>

        {/* The Form */}
        <div className="mt-12 bg-gray-50 border border-gray-200 shadow-lg rounded-lg p-8">
          <AIAuditForm />
        </div>
      </div>
    </main>
  );
}