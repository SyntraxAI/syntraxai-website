import { Metadata } from 'next';
import StrategyCallForm from '@/components/StrategyCallForm';

export const metadata: Metadata = {
  title: 'Book a Free Strategy Call',
  description: 'Book a free strategy call with the Syntrax AI team to discuss your growth goals.',
};

export default function StrategyCallPage() {
  return (
    <main className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Book Your Free Strategy Call
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          This 30-minute call is a no-obligation discovery session to see if 
          we're a good fit. Please be as detailed as possible.
        </p>

        {/* The multi-step form will go here */}
        <div className="mt-10 bg-white border border-gray-200 shadow-lg rounded-lg p-8">
          <StrategyCallForm />
        </div>
      </div>
    </main>
  );
}