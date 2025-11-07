import Link from 'next/link';

type EmbeddedCTAProps = {
  headline: string;
  subtext: string;
  buttonText: string;
};

export default function EmbeddedCTA({ headline, subtext, buttonText }: EmbeddedCTAProps) {
  return (
    <div className="relative my-12 overflow-hidden rounded-2xl bg-blue-600 p-8 shadow-lg">
      {/* Decorative background pattern */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1024 1024"
      >
        <rect width="1024" height="1024" fill="url(#pattern)"></rect>
        <defs>
          <pattern
            id="pattern"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <path d="M64 0H0v64" stroke="white" strokeWidth="2"></path>
          </pattern>
        </defs>
      </svg>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {headline}
        </h3>
        <p className="mt-4 text-lg text-blue-100">
          {subtext}
        </p>
        <Link
          href="/ai-audit" // This component always links to the AI Audit page
          
          // --- THIS IS THE FIX ---
          target="_blank"
          rel="noopener noreferrer"
          // --- END FIX ---

          className="mt-8 inline-block rounded-md bg-white px-5 py-3 text-base font-semibold text-blue-700 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}