import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { contentfulClient } from '@/lib/contentful';
import { RichText } from '@/components/RichTextRenderer';
import { Document } from '@contentful/rich-text-types';
import type { Asset, Entry, EntrySkeletonType } from 'contentful';

// This is our correct type for the blog post fields
type BlogPostSkeleton = EntrySkeletonType<{
  title: string;
  slug: string;
  publishDate: string;
  excerpt: string;
  featuredImage?: Asset<undefined, string>;
  body: Document;
}>

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// This function tells Next.js which slugs (pages) to pre-build
export async function generateStaticParams() {
  // 1. We REMOVED the <BlogPostSkeleton> generic from here
  const entries = await contentfulClient.getEntries({
    content_type: 'blogPost',
  });

  // 2. We add the correct type when we map the items
  return (entries.items as Entry<BlogPostSkeleton>[]).map((item) => ({
    slug: item.fields.slug,
  }));
}

// This function fetches the data for a *single* post
async function getPost(slug: string): Promise<Entry<BlogPostSkeleton> | null> {
  try {
    // 3. We REMOVED the <BlogPostSkeleton> generic from here
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2
    });
    
    if (entries.items.length === 0) {
      return null;
    }
    // 4. We add the correct type to the returned item
    return entries.items[0] as Entry<BlogPostSkeleton>;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// This function generates the page-specific metadata
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


// The Page Component (This code is mostly the same, just safer)
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

  return (
    <main className="bg-white py-24 sm:py-32">
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
            <RichText content={body} />
          </div>
        </article>
      </div>
    </main>
  );
}