import Image from 'next/image';
import Link from 'next/link';
import { blogs } from '../../data/blogs';
import ScrollReveal from '../components/ScrollReveal';

export const metadata = {
  title: "Real Estate Insights & Pune Market Data",
  description: "Explore deep-dive analysis into the Pune real estate market, NA bungalow plots on Sinhagad Road, and official Nanded City township market data.",
  alternates: {
    canonical: 'https://nandedcitypune.com/blog',
  },
};

export default function BlogHub() {
  return (
    <div style={{ backgroundColor: '#f8fafc', paddingBottom: '80px', paddingTop: '100px' }}>
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-eyebrow">Market Insights</span>
          <h1 style={{ color: '#0f172a', marginBottom: '16px' }}>Nanded City & Pune Real Estate Data</h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: '#475569', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Authoritative analysis on the Pune real estate market, NA Bungalow Plots on Sinhagad Road, and comprehensive 
            investment metrics directly from the Nanded City Township data hub.
          </p>
        </ScrollReveal>

        <div className="grid-cols-3" style={{ marginTop: '50px' }}>
          {blogs.map((blog, index) => (
            <ScrollReveal key={blog.slug} delay={index * 0.15}>
              <article className="cluster-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Link href={`/blog/${blog.slug}`} className="card-image-link" style={{ position: 'relative', display: 'block', height: '240px' }}>
                  <Image 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    fill 
                    sizes="(max-width:768px) 100vw, 33vw" 
                    style={{ objectFit: 'cover' }} 
                  />
                  <div className="card-badge-wrap" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                    <span className="badge" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.75rem', padding: '4px 10px' }}>
                      {blog.readTime}
                    </span>
                  </div>
                </Link>
                <div className="card-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {blog.date}
                  </div>
                  <h2 style={{ fontSize: '1.35rem', lineHeight: '1.4', marginBottom: '12px', color: '#1e293b' }}>
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>
                    {blog.excerpt}
                  </p>
                  <Link href={`/blog/${blog.slug}`} className="btn-details" style={{ alignSelf: 'flex-start' }}>
                    Read Complete Analysis →
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
