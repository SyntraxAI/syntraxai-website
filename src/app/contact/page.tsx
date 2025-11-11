import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Syntrax AI team.',
};

export default function ContactPage() {
  return (
    <main className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          The best way to get started is to book a free strategy call. This allows us 
          to understand your goals and match you with the right product.
        </p>
        <div className="mt-10">
          <Link
            href="https://calendly.com/adriank-viloria/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-accent px-3.5 py-2.5 text-lg font-semibold text-primary shadow-sm hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            [ Book Your Free Strategy Call ]
          </Link>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            General Inquiries
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            For general questions, partnerships, or other inquiries, you can 
            reach us by email.
          </p>
          <p className="mt-4 text-lg">
            <a href="mailto:adriank.viloria@gmail.com" className="font-semibold text-primary hover:text-primary/80">
              adriank.viloria@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}