import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.nanded-city.in';

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/', '/cluster/', '/blog/', '/api/indexnow'],
        disallow: ['/admin', '/private', '/_next/static/'],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: ['/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/cluster/', '/blog/'],
        disallow: ['/admin', '/private', '/_next/'],
        crawlDelay: 1,
      },
      {
        userAgent: '*',
        allow: ['/', '/cluster/', '/blog/', '/api/indexnow'],
        disallow: ['/admin', '/private', '/*.json$', '/_next/', '/api/google-index'],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
