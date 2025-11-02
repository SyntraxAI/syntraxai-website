import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { contentfulClient } from '@/lib/contentful';
import { RichText } from '@/components/RichTextRenderer';
import { Document } from '@contentful/rich-text-types';
import type { Asset, Entry, EntrySkeletonType } from 'contentful'; // Import types

// 1. Define the shape of our Featured Image asset
interface FeaturedImage extends Asset {
  fields: {
    title?: string;
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
}

// 2. Define the shape of our Blog Post fields
interface BlogPostFields {
  title: string;
  slug: string;
  publishDate: string;
  excerpt: string;
  featuredImage?: FeaturedImage; // Use the interface here
  body: Document;
}

// 3. Define the full Blog Post entry
interface BlogPostEntry extends Entry<EntrySkeletonType, undefined, string> {
  fields: BlogPostFields;
}

// 4. Define the props for this page
type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// 5. This function tells Next.js which slugs (pages) to pre-build
export async function generateStaticParams() {
  const entries = await contentfulClient.getEntries<BlogPostFields>({
    content_type: 'blogPost',
  });

  return entries.items.map((item) => ({
    slug: item.fields.slug,
  }));
}

// 6. This function fetches the data for a *single* post
async function getPost(slug: string): Promise<BlogPostEntry | null> {
  try {
    const entries = await contentfulClient.getEntries<BlogPostFields>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2 // THIS IS THE FIX: It tells Contentful to include the 'featuredImage' data
    });
    
    if (entries.items.length === 0) {
      return null;
    }
    return entries.items[0] as BlogPostEntry; // Cast to our specific type
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// 7. This function generates the page-specific metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = post.fields.title || 'Untitled Post';
  const description = post.fields.excerpt || 'No description available.';

  return {
    title: `${title} | Syntrax AI Blog`,
    description: description,
  };
}


// 8. The Page Component (now fully typed, no @ts-ignore)
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); // If no post, show a 404 page
  }

  const { title, publishDate, featuredImage, body } = post.fields;
  
  const imageUrl = featuredImage?.fields?.file?.url; // Use optional chaining
  const fullImageUrl = imageUrl?.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  const imageAlt = featuredImage?.fields?.title || title;

  return (
    <main className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <article>
          {/* Post Header */}
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

          {/* Featured Image */}
          {fullImageUrl && (
            <div className="mb-12">
              <Image
                src={fullImageUrl}
                alt={imageAlt}
                width={featuredImage?.fields.file.details.image.width || 800} // Use real width
                height={featuredImage?.fields.file.details.image.height || 450} // Use real height
                className="w-full rounded-2xl bg-gray-100 object-cover shadow-lg"
              />
            </div>
          )}

          {/* Post Body (using our Rich Text Renderer) */}
          <div className="prose prose-lg">
            <RichText content={body} />
          </div>
        </article>
      </div>
    </main>
  );
}