import { clusters } from '../data/clusters';
import { blogs } from '../data/blogs';

export default function sitemap() {
  const baseUrl = 'https://nandedcitypune.com';

  const clusterUrls = clusters.map((c) => ({
    url: `${baseUrl}/cluster/${c.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: c.type === 'new' ? 0.9 : 0.7,
  }));

  const blogUrls = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.date,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...clusterUrls,
    ...blogUrls,
  ];
}
