import { MetadataRoute } from 'next';
import { clusters } from '../data/clusters';
import { blogs } from '../data/blogs';
import { Cluster } from '@/types';

// Helper to escape special characters for XML (specifically ampersands in Unsplash URLs)
const escapeXml = (str: string) => str.replace(/&/g, '&amp;');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nanded-city.in';

  // Accurate lastModified dates based on project status
  const getClusterLastModified = (cluster: Cluster): string => {
    if (cluster.type === 'completed') return '2025-12-01T00:00:00.000Z';
    // Ongoing projects - use a realistic content-update date
    return '2026-03-28T00:00:00.000Z';
  };

  const clusterUrls = clusters.map((c) => ({
    url: escapeXml(`${baseUrl}/cluster/${c.id}`),
    lastModified: getClusterLastModified(c),
    changeFrequency: (c.type === 'completed' ? 'monthly' : 'weekly') as 'monthly' | 'weekly',
    priority: c.type === 'completed' ? 0.60 : 0.95,
    // Google Image Sitemap: embed hero images for indexing
    images: [escapeXml(c.heroImage)],
  }));

  const blogUrls = blogs.map((b) => ({
    url: escapeXml(`${baseUrl}/blog/${b.slug}`),
    lastModified: b.date,
    changeFrequency: 'daily' as const,
    priority: 0.80,
    images: [escapeXml(b.coverImage)],
  }));

  const mrUrls = [
    { slug: '2-bhk-flats', priority: 0.90 },
    { slug: 'bungalow-plots', priority: 0.90 },
  ].map((m) => ({
    url: `${baseUrl}/mr/${m.slug}`,
    lastModified: '2026-03-30T00:00:00.000Z',
    changeFrequency: 'weekly' as const,
    priority: m.priority,
  }));

  const lpUrls = [
    { slug: '2-bhk-flats', priority: 0.90 },
    { slug: '3-bhk-luxury', priority: 0.90 },
    { slug: 'na-bungalow-plots', priority: 0.90 },
  ].map((l) => ({
    url: `${baseUrl}/lp/${l.slug}`,
    lastModified: '2026-03-30T00:00:00.000Z',
    changeFrequency: 'weekly' as const,
    priority: l.priority,
  }));

  return [
    {
      url: baseUrl,
      lastModified: '2026-03-30T00:00:00.000Z',
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: escapeXml(`${baseUrl}/blog`),
      lastModified: '2026-03-30T00:00:00.000Z',
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: '2026-03-30T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/legal-compliance`,
      lastModified: '2026-03-30T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    ...clusterUrls,
    ...blogUrls,
    ...mrUrls,
    ...lpUrls,
  ];
}
