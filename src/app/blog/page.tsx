import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { contentfulClient } from '@/lib/contentful';

export const metadata: Metadata = {
  title: 'Blog - Syntrax AI',
  description: 'Insights on SEO, AI-powered marketing, and business growth.',
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
  };
};
// --- (End Type Definitions) ---


// Fetch all blog posts
async function getAllPosts() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
      include: 2,
    });
    return entries.items as unknown as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Revalidate every 5 minutes
export const revalidate = 300;

// Helper function to format date
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Helper function to get image properties
function getImageProps(post: BlogPost) {
  const imageUrl = post.fields.featuredImage?.fields?.file?.url;
  const fullImageUrl = imageUrl?.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  const imageAlt = post.fields.featuredImage?.fields?.title || post.fields.title;
  const imageWidth = post.fields.featuredImage?.fields?.file?.details?.image?.width;
  const imageHeight = post.fields.featuredImage?.fields?.file?.details?.image?.height;
  return { fullImageUrl, imageAlt, imageWidth, imageHeight };
}


// The Page Component
export default async function BlogPage() {
  const posts = await getAllPosts();

  // NEW: Split posts into a featured post and other posts
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            The Syntrax AI Blog
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Insights on SEO, AI-powered marketing, and business growth.
          </p> 
        </div>

        {/* NEW: Featured Post Section */}
        {featuredPost && (
          <div className="mt-16 mx-auto max-w-7xl border-b border-gray-200 pb-16">
            <h2 className="sr-only">Featured Post</h2>
            <article className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 gap-y-8">
              {/* Featured Image */}
              <div className="relative">
                {(() => {
                  const { fullImageUrl, imageAlt, imageWidth, imageHeight } = getImageProps(featuredPost);
                  return (
                    fullImageUrl && imageWidth && imageHeight ? (
                      <Image
                        src={fullImageUrl}
                        alt={imageAlt}
                        width={imageWidth}
                        height={imageHeight}
                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
                      />
                    ) : (
                      <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100" />
                    )
                  );
                })()}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>

              {/* Featured Content */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={featuredPost.fields.publishDate} className="text-gray-500">
                    {formatDate(featuredPost.fields.publishDate)}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-3xl font-semibold leading-9 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog/${featuredPost.fields.slug}`}>
                      <span className="absolute inset-0" />
                      {featuredPost.fields.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-lg leading-7 text-gray-600">
                    {featuredPost.fields.excerpt}
                  </p>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* NEW: More Posts Section */}
        {otherPosts.length > 0 && (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {otherPosts.map((post) => {
              const { fullImageUrl, imageAlt, imageWidth, imageHeight } = getImageProps(post);

              return (
                <article key={post.sys.id} className="flex flex-col items-start justify-between">
                  <div className="relative w-full">
                    {fullImageUrl && imageWidth && imageHeight ? (
                      <Image
                        src={fullImageUrl}
                        alt={imageAlt}
                        width={imageWidth}
                        height={imageHeight}
                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                      />
                    ) : (
                      <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]" />
                    )}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time dateTime={post.fields.publishDate} className="text-gray-500">
                        {formatDate(post.fields.publishDate)}
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
        )}
      </div>
    </main>
  );
}