import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogs } from '../../../data/blogs';
import { clusters } from '../../../data/clusters';

export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = blogs.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Nanded City Pune Insights`,
    description: post.excerpt,
    alternates: {
      canonical: `https://nandedcitypune.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://nandedcitypune.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default function BlogPost({ params }) {
  const post = blogs.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  // Generate Article Schema for SGE & Discover Feed
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nandedcitypune.com/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,  
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": "https://nandedcitypune.com"
    },  
    "publisher": {
      "@type": "Organization",
      "name": "Nanded City Developers Pune",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nandedcitypune.com/wp-content/themes/nandedcity/images/nc-logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date
  };

  // Find the related cluster for the conversion funnel CTA
  const relatedEntity = clusters.find(c => c.id === post.relatedCluster) || clusters[0];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <article style={{ backgroundColor: '#fff', paddingTop: '80px' }}>
        {/* Header Hero */}
        <div style={{ position: 'relative', height: '400px', width: '100%', backgroundColor: '#0f172a' }}>
          <Image 
            src={post.coverImage} 
            alt={post.title}
            fill
            priority
            style={{ objectFit: 'cover', opacity: 0.4 }}
          />
          <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <span className="badge badge-gold" style={{ marginBottom: '24px', display: 'inline-block' }}>{post.readTime}</span>
              <h1 style={{ color: '#fff', fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '24px' }}>
                {post.title}
              </h1>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>✏️ {post.author}</span>
                <span>•</span>
                <span>📅 {post.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="container" style={{ maxWidth: '800px', padding: '60px 20px' }}>
          {/* We inject the localized market data directly here. We are rendering raw HTML from the SSG JSON. */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} style={{ lineHeight: '1.8', color: '#334155', fontSize: '1.1rem' }} />
          
          <hr style={{ margin: '60px 0', border: '0', borderTop: '1px solid #e2e8f0' }} />

          {/* Internal Linking SEO Funnel */}
          <div style={{ backgroundColor: '#f8fafc', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', marginBottom: '12px', display: 'block' }}>
              Take the Next Step
            </span>
            <h3 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '16px' }}>Ready to Invest in Your Future?</h3>
            <p style={{ color: '#64748b', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Explore the premium MahaRERA registered offerings directly inside Nanded City. 
              Secure your property in Pune's most robust micro-market today.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href={`/cluster/${relatedEntity.id}`} className="btn btn-gold">
                View {relatedEntity.name} Details
              </Link>
              <Link href="/#contact" className="btn btn-outline" style={{ borderColor: '#94a3b8', color: '#475569' }}>
                Request Market Data Report
              </Link>
            </div>
          </div>
        </div>
      </article>
      
      {/* Global Scoped CSS for Prose Elements to ensure generated HTML looks beautiful */}
      <style dangerouslySetInnerHTML={{__html: `
        .prose h2 {
          color: #0f172a;
          margin-top: 2em;
          margin-bottom: 0.8em;
          font-size: 1.8rem;
        }
        .prose h3 {
          color: #1e293b;
          margin-top: 1.6em;
          margin-bottom: 0.6em;
          font-size: 1.4rem;
        }
        .prose p {
          margin-bottom: 1.4em;
        }
        .prose ul {
          margin-bottom: 1.4em;
          padding-left: 1.5em;
        }
        .prose li {
          margin-bottom: 0.5em;
        }
        .prose strong {
          color: #0f172a;
          font-weight: 600;
        }
      `}} />
    </>
  );
}
