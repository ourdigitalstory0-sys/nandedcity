import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.baseUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/cluster/', '/blog/', '/lp/', '/mr/', '/projects', '/api/indexnow'],
        disallow: ['/admin', '/private', '/_next/', '/api/google-index', '/*.json$'],
        crawlDelay: 0, // Hardening: ensuring no artificial crawl delay for modern indexing
      },
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/admin', '/private', '/_next/static/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
