//
// ⬇️ PASTE THIS NEW CODE INTO: src/app/api/revalidate/route.ts ⬇️
//
import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// This is the secret token you have in your .env and Vercel
const SECRET_TOKEN = process.env.CONTENTFUL_REVALIDATE_SECRET;

if (!SECRET_TOKEN) {
  throw new Error('CONTENTFUL_REVALIDATE_SECRET is not set');
}

// This function handles POST requests from Contentful
export async function POST(req: NextRequest) {

  // 1. Authenticate the request
  const authHeader = req.headers.get('Authorization');

  // Check if the header matches our "Bearer <token>" format
  if (authHeader !== `Bearer ${SECRET_TOKEN}`) {
    return new Response('Invalid token', { status: 401 });
  }

  try {
    // 2. Parse the request body
    const body = await req.json();

    const contentType = body.sys?.contentType?.sys?.id;
    const slug = body.fields?.slug?.['en-US'];

    if (!contentType) {
      return new Response('Bad Request: Missing content type', { status: 400 });
    }

    // 3. Revalidate the correct path(s)

    // If the content type is blogPost
    if (contentType === 'blogPost') {
      revalidatePath('/blog'); // Revalidate the main blog list page
      if (slug) {
        revalidatePath(`/blog/${slug}`); // Revalidate the specific post
        console.log(`REVALIDATED: /blog/${slug}`);
      }
    }

    // If the content type is project (Product)
    if (contentType === 'project') {
      revalidatePath('/products'); // Revalidate the main products list page
      if (slug) {
        revalidatePath(`/products/${slug}`); // Revalidate the specific product
        console.log(`REVALIDATED: /products/${slug}`);
      }
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });

  } catch (err: unknown) {
    let errorMessage = 'Unknown error';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Revalidation error:", errorMessage);
    return new Response(errorMessage, { status: 500 });
  }
}