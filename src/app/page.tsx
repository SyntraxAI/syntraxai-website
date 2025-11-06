import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Ditch the Retainer. Buy the Result.
          </h1>
          {/* --- FIX: Escaped apostrophe ' --- */}
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We&apos;re a new kind of agency for SMBs and Start-ups. We’ve productized 
            digital marketing into fixed-price packages, so you get exactly what 
            you need, when you need it. No confusing contracts. No surprise fees.
          </p>
          {/* --- FIX: Replaced single CTA with Dual-CTA --- */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/products#foundation"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get Your Foundation
            </Link>
            <Link
              href="/products#engine"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Scale Your Engine <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
              The Old Way vs. The New Way
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
              {/* Column 1: The "Old" Agency */}
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                {/* --- FIX: Escaped quotes " --- */}
                <h3 className="text-2xl font-semibold leading-8 text-gray-900">The &quot;Old&quot; Agency</h3>
                <ul role="list" className="mt-8 space-y-3 text-gray-600">
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    <span>Vague, 12-month retainers</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    <span>Confusing proposals &amp; surprise fees</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    <span>Slow onboarding &amp; delivery</span>
                  </li>
                </ul>
              </div>
              {/* Column 2: The "Productized" Agency */}
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                {/* --- FIX: Escaped quotes " --- */}
                <h3 className="text-2xl font-semibold leading-8 text-gray-900">The &quot;Productized&quot; Agency</h3>
                <ul role="list" className="mt-8 space-y-3 text-gray-600">
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>Fixed-scope, monthly subscriptions</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>Transparent, public pricing</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>Launch in days, not months</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          How It Works
        </h2>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
          {/* Step 1 */}
          <div className="flex flex-col">
            <div className="text-xl font-semibold text-blue-600">01.</div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">Choose Your Product</h3>
            <p className="mt-2 text-base text-gray-600">
              Browse our menu of fixed-price products. Find the exact solution you need, 
              from a new website to a monthly content plan.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col">
            <div className="text-xl font-semibold text-blue-600">02.</div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">Book Your Strategy Call</h3>
            <p className="mt-2 text-base text-gray-600">
              {/* --- FIX: Escaped apostrophe ' --- */}
              Schedule a free 30-minute call. You&apos;ll talk to our founder, not a salesperson, 
              to confirm the product is a perfect fit.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col">
            <div className="text-xl font-semibold text-blue-600">03.</div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">We Get to Work</h3>
            <p className="mt-2 text-base text-gray-600">
              Our human-led, AI-powered team builds your product. We use AI for speed 
              and human experts for strategy and quality.
            </p>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col">
            <div className="text-xl font-semibold text-blue-600">04.</div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">Receive Your Deliverable</h3>
            <p className="mt-2 text-base text-gray-600">
              On time and on budget. We deliver your finished product and show you 
              the next clear step to growth.
            </p>
          </div>
        </div>
        {/* Secondary CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            href="https://calendly.com/adriank-viloria/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            [ Book Your Free Strategy Call ]
          </Link>
        </div>
      </div>
    </main>
  );
}