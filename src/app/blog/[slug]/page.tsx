import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { contentfulClient } from '@/lib/contentful';
import { RichText } from '@/components/RichTextRenderer';
import { Document } from '@contentful/rich-text-types';

// 1. Define the props for this page
type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// --- FIX: Define a type for our Blog Post to avoid 'any' ---
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
// --- END FIX ---


// 2. This function tells Next.js which slugs (pages) to pre-build
export async function generateStaticParams() {
  const entries = await contentfulClient.getEntries({
    content_type: 'blogPost',
    select: ['fields.slug']
  });
  
  // --- FIX: Revert to 'as any[]' and disable the linter rule for this line ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (entries.items as any[]).map((item) => ({
    slug: item.fields.slug,
  }));
}

// 4. This function fetches the data for a *single* post
// --- FIX: Return our new BlogPost type ---
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
    // --- FIX: Use 'as unknown as BlogPost' to safely cast the type ---
    return entries.items[0] as unknown as BlogPost;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// 6. This function generates the page-specific metadata
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


// 7. The Page Component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  // 8. We destructure fields from 'post'
  const { title, publishDate, featuredImage, body } = post.fields;
  
  const imageUrl = featuredImage?.fields?.file?.url;
  const fullImageUrl = imageUrl?.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  const imageAlt = featuredImage?.fields?.title || title;
  const imageWidth = featuredImage?.fields?.file?.details?.image?.width;
  const imageHeight = featuredImage?.fields?.file?.details?.image?.height;

  // --- START MODIFICATION: Add Article Schema ---
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
        "url": "https://www.syntraxai.com/logo.png" // Assuming logo is here
      }
    },
    "image": fullImageUrl || "" // Add the image URL or an empty string
  };
  // --- END MODIFICATION ---

  return (
    <main className="bg-white py-24 sm:py-32">
      {/* --- START MODIFICATION: Inject Schema Script --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* --- END MODIFICATION --- */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
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

          <div className="prose prose-lg">
            <RichText content={body as Document} />
          </div>
        </article>
      </div>
    </main>
  );
}