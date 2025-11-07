import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // --- START: IMAGE CONFIGURATION ---
  // This tells Next.js to trust images from our Contentful account
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  // --- END: IMAGE CONFIGURATION ---
};

export default nextConfig;