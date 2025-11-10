/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js to trust images from our Contentful account
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
};

module.exports = nextConfig;