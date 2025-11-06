import { Metadata } from 'next';
// import Image from 'next/image'; // Removed unused import
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

// --- FIX: Define a type for our Product to avoid 'any' ---
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
// --- END FIX ---

// This function tells Next.js which slugs (pages) to pre-build
export async function generateStaticParams() {
  const entries = await contentfulClient.getEntries({
    content_type: 'project', // Still uses 'project' content type ID
    select: ['fields.slug']
  });

  // --- FIX: Revert to 'as any[]' and disable the linter rule for this line ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (entries.items as any[]).map((item) => ({
    slug: item.fields.slug,
  }));
}

// This function fetches the data for a *single* product
// --- FIX: Return our new Product type ---
async function getProduct(slug: string): Promise<Product | null> {
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
    // --- FIX: Use 'as unknown as Product' to safely cast the type ---
    return entries.items[0] as unknown as Product;
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

  // --- START: Add Product Schema ---
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
      "priceCurrency": "USD", // Adjust if needed
      "availability": "https://schema.org/InStock",
      "url": `https://www.syntraxai.com/products/${params.slug}`
    },
    "category": category
  };
  // --- END: Add Product Schema ---

  return (
    <main className="bg-white py-24 sm:py-32">
      {/* --- START MODIFICATION: Inject Schema Script --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* --- END MODIFICATION --- */}
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
            {/* --- FIX: This was the typo. Corrected to </p> --- */}
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