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

// 2. This function tells Next.js which slugs (pages) to pre-build
export async function generateStaticParams() {
  const entries = await contentfulClient.getEntries({
    content_type: 'blogPost',
  });

  return entries.items.map((item) => ({
    // @ts-ignore
    slug: item.fields.slug,
  }));
}

// 3. This function fetches the data for a *single* post
async function getPost(slug: string) {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    
    if (entries.items.length === 0) {
      return null; // No post found
    }
    return entries.items[0];
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// 4. This function generates the page-specific metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // @ts-ignore
  const title = post.fields.title;
  // @ts-ignore
  const description = post.fields.excerpt;

  return {
    title: `${title} | Syntrax AI Blog`,
    description: description,
  };
}


// 5. The Page Component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); // If no post, show a 404 page
  }

  // @ts-ignore
  const { title, publishDate, featuredImage, body } = post.fields;
  
  const imageUrl = featuredImage?.fields.file.url;
  const fullImageUrl = imageUrl?.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  const imageAlt = featuredImage?.fields.title || title;

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
                width={800}
                height={450}
                className="w-full rounded-2xl bg-gray-100 object-cover shadow-lg"
              />
            </div>
          )}

          {/* Post Body (using our Rich Text Renderer) */}
          <div className="prose prose-lg">
            <RichText content={body as Document} />
          </div>
        </article>
      </div>
    </main>
  );
}