/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables high-performance static HTML export for Cloudflare Pages
  trailingSlash: true, // Recommended for Cloudflare to ensure clean directory routing
  images: {
    unoptimized: true, // Required for static export; Cloudflare Image Resizing can be handled at the edge if needed
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nandedcitypune.com',
        pathname: '/**',
      },
    ],
  },
  // Note: async headers() are not supported in static exports. 
  // We have migrated these to public/_headers for Cloudflare native execution.
};

export default nextConfig;
