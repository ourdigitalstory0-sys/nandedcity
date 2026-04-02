import { clusters } from '../data/clusters';
import { blogs } from '../data/blogs';

export default function sitemap() {
  const baseUrl = 'https://nandedcitypune.com';

  // Accurate lastModified dates based on project status
  const getClusterLastModified = (cluster) => {
    if (cluster.type === 'completed') return '2025-12-01T00:00:00.000Z';
    // Ongoing projects - use a realistic content-update date
    return '2026-03-28T00:00:00.000Z';
  };

  const clusterUrls = clusters.map((c) => ({
    url: `${baseUrl}/cluster/${c.id}`,
    lastModified: getClusterLastModified(c),
    changeFrequency: c.type === 'completed' ? 'monthly' : 'weekly',
    priority: c.type === 'completed' ? 0.60 : 0.95,
    // Google Image Sitemap: embed hero images for indexing
    images: [c.heroImage],
  }));

  const blogUrls = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.date,
    changeFrequency: 'daily',
    priority: 0.80,
    images: [b.coverImage],
  }));

  return [
    {
      url: baseUrl,
      lastModified: '2026-03-30T00:00:00.000Z',
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: '2026-03-30T00:00:00.000Z',
      changeFrequency: 'daily',
      priority: 0.85,
    },
    ...clusterUrls,
    ...blogUrls,
  ];
}
