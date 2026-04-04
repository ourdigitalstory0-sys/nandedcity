import { MetadataRoute } from 'next';
import { clusters } from '../data/clusters';
import { blogs } from '../data/blogs';
import { Cluster } from '@/types';

// Helper to escape special characters for XML (specifically ampersands in Unsplash URLs)
const escapeXml = (str: string) => str.replace(/&/g, '&amp;');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nanded-city.in';

  const currentDate = new Date().toISOString();

  // Accurate lastModified dates based on project status
  const getClusterLastModified = (cluster: Cluster): string => {
    if (cluster.type === 'completed') return '2025-12-01T00:00:00.000Z';
    // Ongoing projects - use a realistic content-update date
    return currentDate;
  };

  const clusterUrls = clusters.map((c) => ({
    url: escapeXml(`${baseUrl}/cluster/${c.id}`),
    lastModified: getClusterLastModified(c),
    changeFrequency: (c.type === 'completed' ? 'monthly' : 'daily') as 'monthly' | 'daily',
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
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: m.priority,
  }));

  const lpUrls = [
    { slug: '2-bhk-flats', priority: 0.90 },
    { slug: '3-bhk-luxury', priority: 0.90 },
    { slug: 'na-bungalow-plots', priority: 0.90 },
  ].map((l) => ({
    url: `${baseUrl}/lp/${l.slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: l.priority,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: escapeXml(`${baseUrl}/blog`),
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/legal-compliance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    ...clusterUrls,
    ...blogUrls,
    ...mrUrls,
    ...lpUrls,
  ];
}
