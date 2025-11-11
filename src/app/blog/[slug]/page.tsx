import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { contentfulClient } from '@/lib/contentful';
import { RichText } from '@/components/RichTextRenderer';
import { Document } from '@contentful/rich-text-types';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// --- (Type Definitions are unchanged) ---
type ContentfulImageDetails = {
  image: {
    width: number;
    height: number;
  }
}
type ContentfulImageFile = {
  url: string;
  details: ContentfulImageDetails;
}
type ContentfulImage = {
  fields: {
    title: string;
    file: ContentfulImageFile;
  }
}
type BlogPost = {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    publishDate: string;
    featuredImage: ContentfulImage;
    body: Document;
  };
};
// --- (End Type Definitions) ---

export async function generateStaticParams() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      select: ['fields.slug'],
    });

    const posts = (entries.items as unknown as { fields: { slug: string } }[]);

    return posts.map((post) => ({
      slug: post.fields.slug,
    }));
  } catch (error) {
    console.error("Error fetching slugs for generateStaticParams:", error);
    return [];
  }
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2
    });

    if (entries.items.length === 0) {
      return null;
    }
    return entries.items[0] as unknown as BlogPost;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = post.fields.title || 'Untitled Product';
  const description = post.fields.excerpt || 'No description available.';

  return {
    title: `${title} | Syntrax AI Blog`,
    description: description,
  };
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const { title, publishDate, featuredImage, body } = post.fields;

  const imageUrl = featuredImage?.fields?.file?.url;
  const fullImageUrl = imageUrl?.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  const imageAlt = featuredImage?.fields?.title || title;
  const imageWidth = featuredImage?.fields?.file?.details?.image?.width;
  const imageHeight = featuredImage?.fields?.file?.details?.image?.height;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "datePublished": publishDate,
    "author": {
      "@type": "Organization",
      "name": "Syntrax AI"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Syntrax AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.syntraxai.com/logo.png" 
      }
    },
    "image": fullImageUrl || "" 
  };

  return (
    <main className="bg-white py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/*
        NEW: Changed max-w-3xl to max-w-7xl and added grid layout
      */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-12">
        
        {/* Column 1: Article Content */}
        <div className="lg:col-span-2">
          <article>
            <header className="mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
                {title}
              </h1>
              <time dateTime={publishDate} className="text-gray-500">
                {new Date(publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </header>

            {fullImageUrl && imageWidth && imageHeight && (
              <div className="mb-12">
                <Image
                  src={fullImageUrl}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full rounded-2xl bg-gray-100 object-cover shadow-lg"
                />
              </div>
            )}

            <div>
              <RichText content={body as Document} />
            </div>
          </article>
        </div>

        {/* NEW: Column 2: Sticky Sidebar CTA */}
        <div className="hidden lg:block lg:col-span-1">
          {/* The 'sticky' class makes it stick.
            'top-32' positions it 32 units (8rem) from the top, just below your sticky header.
          */}
          <div className="sticky top-32 space-y-6">
            <div className="rounded-2xl bg-gray-50 p-6 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-semibold text-primary">
                Ready to Grow?
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Let&apos;s build your AI-powered marketing engine. Book a free,
                no-pressure strategy call today.
              </p>
              <Link
                href="https://calendly.com/adriank-viloria/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-transform hover:scale-105"
              >
                [ Book Your Free Strategy Call ]
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}