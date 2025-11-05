import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { contentfulClient } from '@/lib/contentful';
import { RichText } from '@/components/RichTextRenderer';
import { Document } from '@contentful/rich-text-types';

// Define the props for this page
type ProductPageProps = {
  params: {
    slug: string;
  };
};

// This function tells Next.js which slugs (pages) to pre-build
export async function generateStaticParams() {
  const entries = await contentfulClient.getEntries({
    content_type: 'project', // Still uses 'project' content type ID
    select: ['fields.slug']
  });

  // @ts-ignore
  return (entries.items as any[]).map((item) => ({
    slug: item.fields.slug,
  }));
}

// This function fetches the data for a *single* product
async function getProduct(slug: string): Promise<any | null> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'project',
      'fields.slug': slug,
      limit: 1,
      include: 2
    });

    if (entries.items.length === 0) {
      return null;
    }
    return entries.items[0] as any;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// This function generates the page-specific metadata
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = product.fields.title || 'Untitled Product';
  const description = product.fields.description || 'No description available.';

  return {
    title: `${title} | Syntrax AI`,
    description: description,
  };
}


// The Page Component
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  // Destructure fields from 'product'
  const { title, description, price, bestFor, category, body } = product.fields;

  return (
    <main className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <article>
          {/* Product Header */}
          <header className="mb-12 border-b border-gray-200 pb-8">
            <p className="text-base font-semibold leading-7 text-blue-600">
              {category} Product
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-700">
              {description}
            </p>
            <p className="mt-6 text-3xl font-bold text-gray-900">
              {price}
            </p>
            <p className="mt-4 text-base text-gray-600">
              <span className="font-semibold text-gray-800">Best for:</span> {bestFor}
            </p>
            <Link
              href="https://calendly.com/adriank-viloria/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              [ Book Your Free Strategy Call ]
            </Link>
          </header>

          {/* Main Content Body */}
          {/* Assumes you have a Rich Text field in Contentful named 'body' 
              for the "Deliverables" and full details */}
          <div className="prose prose-lg">
            {body ? (
              <RichText content={body as Document} />
            ) : (
              <p>More details coming soon.</p>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}