import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { contentfulClient } from '@/lib/contentful';
import { RichText } from '@/components/RichTextRenderer';
import { Document } from '@contentful/rich-text-types';
import { unstable_noStore as noStore } from 'next/cache';

// --- FIX 1: Force dynamic rendering ---
export const dynamic = 'force-dynamic';

// --- FIX 2: Update Type for Next.js 15 ---
type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// (Type Definitions)
type Product = {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    description: string;
    price: string;
    bestFor: string;
    category: string;
    body: Document;
  };
};

async function getProduct(slug: string): Promise<Product | null> {
  noStore();
  
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
    return entries.items[0] as unknown as Product;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // --- FIX 3: Await params ---
  const { slug } = await params;
  const product = await getProduct(slug);

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

export default async function ProductPage({ params }: ProductPageProps) {
  // --- FIX 4: Await params ---
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const { title, description, price, bestFor, category, body } = product.fields;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "brand": {
      "@type": "Organization",
      "name": "Syntrax AI"
    },
    "offers": {
      "@type": "Offer",
      "price": price, 
      "priceCurrency": "USD", 
      "availability": "https://schema.org/InStock",
      "url": `https://www.syntraxai.com/products/${slug}`
    },
    "category": category
  };

  return (
    <main className="bg-white py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <article>
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
              href="https://calendly.com/syntraxai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              [ Book Your Free Strategy Call ]
            </Link>
          </header>

          <div>
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