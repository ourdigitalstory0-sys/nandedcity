import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/config/site';
import { clusters } from '@/data/clusters';
import { blogs } from '@/data/blogs';

export async function GET() {
  const latestBlogs = blogs.slice(0, 10);
  const activeClusters = clusters.filter(c => c.type === 'new');

  let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <link>${SITE_CONFIG.baseUrl}</link>
    <description>${SITE_CONFIG.description}</description>
    <language>en-in</language>
    <atom:link href="${SITE_CONFIG.baseUrl}/api/rss" rel="self" type="application/rss+xml" />`;

  // Add Blogs
  latestBlogs.forEach((blog) => {
    rss += `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${SITE_CONFIG.baseUrl}/blog/${blog.slug}</link>
      <description><![CDATA[${blog.excerpt}]]></description>
      <guid>${SITE_CONFIG.baseUrl}/blog/${blog.slug}</guid>
    </item>`;
  });

  // Add Real Estate Clusters
  activeClusters.forEach((cluster) => {
    rss += `
    <item>
      <title><![CDATA[${cluster.name} - ${cluster.bhk} in Nanded City Pune]]></title>
      <link>${SITE_CONFIG.baseUrl}/cluster/${cluster.id}</link>
      <description><![CDATA[${cluster.description}]]></description>
      <guid>${SITE_CONFIG.baseUrl}/cluster/${cluster.id}</guid>
    </item>`;
  });

  rss += `
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
