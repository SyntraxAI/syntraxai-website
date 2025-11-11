import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* NEW: We add a subtle background gradient here to add depth
         */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#16e1a7] to-[#0f2c4b] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        {/* NEW: This is now a 2-column grid on desktop (lg:grid-cols-2).
          We also changed padding: py-32 is now py-24 sm:py-32
        */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:py-32">
          {/* Column 1: Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-6xl">
              Ditch the Retainer. Buy the Result.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We&apos;re a new kind of agency for SMBs and Start-ups. We’ve productized 
              digital marketing into fixed-price packages, so you get exactly what 
              you need, when you need it. No confusing contracts. No surprise fees.
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <Link
                href="/products#foundation"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-transform hover:scale-105"
              >
                Get Your Foundation
              </Link>
              <Link
                href="/products#engine"
                className="text-sm font-semibold leading-6 text-primary hover:text-primary/80 transition-transform hover:scale-105"
              >
                Scale Your Engine <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Visual (Empty for now, but structures the page)
            We can add an image or graphic here later.
          */}
          <div className="hidden lg:block">
            {/* Placeholder for a future image/graphic */}
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
                <h3 className="text-2xl font-semibold leading-8 text-gray-900">The &quot;Old&quot; Agency</h3>
                <ul role="list" className="mt-8 space-y-3 text-gray-600">
                  {/*
                    NEW: Replaced the old SVG with a modern 'X' icon
                  */}
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Vague, 12-month retainers</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Confusing proposals &amp; surprise fees</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Slow onboarding &amp; delivery</span>
                  </li>
                </ul>
              </div>
              {/* Column 2: The "Productized" Agency */}
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                <h3 className="text-2xl font-semibold leading-8 text-gray-900">The &quot;Productized&quot; Agency</h3>
                <ul role="list" className="mt-8 space-y-3 text-gray-600">
                  {/*
                    NEW: Replaced the old SVG with a modern 'Check' icon and set color to text-accent
                  */}
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Fixed-scope, monthly subscriptions</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Transparent, public pricing</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
          <div className="flex flex-col border-t-2 border-primary pt-8">
            <div className="text-xl font-semibold text-primary">01.</div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">Choose Your Product</h3>
            <p className="mt-2 text-base text-gray-600">
              Browse our menu of fixed-price products. Find the exact solution you need, 
              from a new website to a monthly content plan.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col border-t-2 border-primary pt-8">
            <div className="text-xl font-semibold text-primary">02.</div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">Book Your Strategy Call</h3>
            <p className="mt-2 text-base text-gray-600">
              {/* --- FIX: Escaped apostrophe ' --- */}
              Schedule a free 30-minute call. You&apos;ll talk to our founder, not a salesperson, 
              to confirm the product is a perfect fit.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col border-t-2 border-primary pt-8">
            <div className="text-xl font-semibold text-primary">03.</div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">We Get to Work</h3>
            <p className="mt-2 text-base text-gray-600">
              Our human-led, AI-powered team builds your product. We use AI for speed 
              and human experts for strategy and quality.
            </p>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col border-t-2 border-primary pt-8">
            <div className="text-xl font-semibold text-primary">04.</div>
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
            className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-transform hover:scale-105"
          >
            [ Book Your Free Strategy Call ]
          </Link>
        </div>
      </div>
    </main>
  );
}