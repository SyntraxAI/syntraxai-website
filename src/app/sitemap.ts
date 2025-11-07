import { MetadataRoute } from 'next';
import { contentfulClient } from '@/lib/contentful';

// Define a type for the entries we're fetching
type ContentfulEntry = {
  fields: {
    slug: string;
  };
  sys: {
    updatedAt: string;
  };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.syntraxai.com';

  // --- 1. Get All Blog Posts ---
  const blogEntries = await contentfulClient.getEntries({
    content_type: 'blogPost',
    select: ['fields.slug', 'sys.updatedAt'],
  });
  
  const blogPosts = (blogEntries.items as ContentfulEntry[]).map((item) => ({
    url: `${baseUrl}/blog/${item.fields.slug}`,
    lastModified: new Date(item.sys.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // --- 2. Get All Products ---
  const productEntries = await contentfulClient.getEntries({
    content_type: 'project', // This is the ID for your products
    select: ['fields.slug', 'sys.updatedAt'],
  });

  const productPosts = (productEntries.items as ContentfulEntry[]).map((item) => ({
    url: `${baseUrl}/products/${item.fields.slug}`,
    lastModified: new Date(item.sys.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // --- 3. Define Static Pages ---
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ai-audit`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // --- 4. Combine and Return All URLs ---
  return [...staticPages, ...blogPosts, ...productPosts];
}