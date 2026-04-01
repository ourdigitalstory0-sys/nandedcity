import { clusters } from '../data/clusters';

export default function sitemap() {
  const baseUrl = 'https://nandedcitypune.com';

  const clusterUrls = clusters.map((c) => ({
    url: `${baseUrl}/cluster/${c.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: c.type === 'new' ? 0.9 : 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...clusterUrls,
  ];
}
