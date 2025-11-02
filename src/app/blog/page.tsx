import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { contentfulClient } from '@/lib/contentful'; // Import our client

export const metadata: Metadata = {
  title: 'Blog - Syntrax AI',
  description: 'Insights on SEO, AI-powered marketing, and business growth.',
};

// 1. Define the data we expect from Contentful
type BlogPost = {
  sys: { id: string, createdAt: string };
  fields: {
    title: string;
    slug: string;
    publishDate: string;
    excerpt: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
          details: {
            image: { width: number; height: number };
          };
        };
        title?: string;
      };
    };
  };
};

// 2. Fetch all blog posts
async function getAllPosts() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishDate'], // Order by publish date, newest first
    });
    return entries.items as unknown as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// 3. The Page Component
export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            The Syntrax AI Blog
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Insights on SEO, AI-powered marketing, and business growth.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = post.fields.featuredImage?.fields.file.url;
            const fullImageUrl = imageUrl?.startsWith('//') ? `https:${imageUrl}` : imageUrl;
            const imageAlt = post.fields.featuredImage?.fields.title || post.fields.title;

            return (
              <article key={post.sys.id} className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  {fullImageUrl && (
                    <Image
                      src={fullImageUrl}
                      alt={imageAlt}
                      width={500}
                      height={300}
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    />
                  )}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={post.fields.publishDate} className="text-gray-500">
                      {new Date(post.fields.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link href={`/blog/${post.fields.slug}`}>
                        <span className="absolute inset-0" />
                        {post.fields.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.fields.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}