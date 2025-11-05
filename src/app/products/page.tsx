import { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { contentfulClient } from '@/lib/contentful';

export const metadata: Metadata = {
  title: 'Our Products - Fixed-Price Marketing Packages',
  description: 'Our services are broken into "Foundation" products to get you started and "Engine" products to fuel your growth.',
};

// Fetch all projects from Contentful
async function getProducts() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'project', // This is the 'Api Identifier' of your Content Model
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching projects from Contentful:", error);
    return []; // Return an empty array on error
  }
}

export default async function ProductsPage() {
  const allProducts = await getProducts();

  // Filter products based on the 'category' field
  // @ts-ignore
  const foundationProducts = allProducts.filter(p => p.fields.category && p.fields.category.includes('Foundation'));
  // @ts-ignore
  const engineProducts = allProducts.filter(p => p.fields.category && p.fields.category.includes('Engine'));

  return (
    <main className="bg-white">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Our Products
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We built the exact marketing solutions start-ups and SMBs need. 
            Our services are broken into "Foundation" products to get you started 
            and "Engine" products to fuel your growth.
          </p>
        </div>

        {/* Category 1: Foundation Products */}
        <div className="mx-auto mt-16 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            Foundation Products
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center">
            One-time fees to get new businesses off the ground.
          </p>
          <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 items-stretch gap-8 lg:max-w-none lg:grid-cols-2">
            {foundationProducts.map((product) => (
              <ProductCard
                key={product.sys.id}
                // @ts-ignore
                title={product.fields.title}
                // @ts-ignore
                description={product.fields.description}
                // @ts-ignore
                price={product.fields.price}
                // @ts-ignore
                bestFor={product.fields.bestFor}
                // @ts-ignore
                ctaLink={`/products/${product.fields.slug}`}
              />
            ))}
          </div>
        </div>

        {/* Category 2: Engine Products */}
        <div className="mx-auto mt-24 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            Engine Products
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Monthly subscriptions to grow your business.
          </p>
          <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 items-stretch gap-8 lg:max-w-none lg:grid-cols-2">
            {engineProducts.map((product) => (
              <ProductCard
                key={product.sys.id}
                // @ts-ignore
                title={product.fields.title}
                // @ts-ignore
                description={product.fields.description}
                // @ts-ignore
                price={product.fields.price}
                // @ts-ignore
                bestFor={product.fields.bestFor}
                // @ts-ignore
                ctaLink={`/products/${product.fields.slug}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Why This Model Works Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why This Model Works
            </h2>
            <p className="mt-6 text-2xl font-semibold leading-8 text-blue-600">
              Human-Led, AI-Powered.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              We believe in a new model that gives you the best of both worlds.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">AI-Powered Efficiency</h3>
              <p className="mt-4 text-base text-gray-600">
                Our AI is our "virtual employee." It handles 80% of the heavy lifting—drafting content, 
                analyzing massive datasets, and identifying opportunities. This is how we deliver 
                high-quality work in days, not months, at a price that makes sense.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Human-Expert Quality</h3>
              <p className="mt-4 text-base text-gray-600">
                AI is a tool, not a strategist. Our human core—a Specialist and an Operator—is 
                your guarantee of quality. A human expert always handles the strategy, the final 20% 
                of editing, and is 100% accountable for the results. You get the efficiency of AI 
                with the trust and accountability of a human partner.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Not Sure What You Need?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            That's what we're here for. Book a free 30-minute, no-pressure strategy call. 
            We'll listen to your goals and tell you exactly which product (if any) is right for you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
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
      </div>
    </main>
  );
}