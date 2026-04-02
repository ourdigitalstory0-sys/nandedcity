import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { blogs } from '../../../data/blogs';
import { clusters } from '../../../data/clusters';
import Breadcrumbs from '../../components/Breadcrumbs';
import { BlogPosting, BreadcrumbList, WithContext, SpeakableSpecification } from 'schema-dts';

interface PostParams {
  slug: string;
}

export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<PostParams> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogs.find((p) => p.slug === resolvedParams.slug);
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

export default async function BlogPost({ params }: { params: Promise<PostParams> }) {
  const resolvedParams = await params;
  const post = blogs.find((p) => p.slug === resolvedParams.slug);
  if (!post) {
    notFound();
  }

  // Enhanced BlogPosting Schema with Speakable + E-E-A-T
  const jsonLd: any = {
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
      "url": "https://nandedcitypune.com",
      "knowsAbout": [
        "Real Estate Investment in Pune",
        "Sinhagad Road Property Market",
        "NA Bungalow Plots Investment",
        "MahaRERA Compliance",
        "Township Living Pune",
        "Luxury Apartments South Pune"
      ],
      "memberOf": {
        "@type": "Organization",
        "name": "Nanded City Developers Pune"
      }
    },  
    "publisher": {
      "@type": "Organization",
      "name": "Nanded City Developers Pune",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nandedcitypune.com/wp-content/themes/nandedcity/images/nc-logo.png"
      },
      "@id": "https://nandedcitypune.com/#organization"
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "inLanguage": "en-IN",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://nandedcitypune.com/#website"
    },
    // Speakable — enables Google Assistant and SGE audio answers
    "speakable": {
      "@type": "SpeakableSpecification",
      "xpath": [".blog-speakable-headline", ".blog-speakable-excerpt"]
    },
    "about": {
      "@type": "Thing",
      "name": "Nanded City Pune Real Estate",
      "sameAs": "https://nandedcitypune.com"
    },
    "keywords": `${post.category}, Nanded City Pune, Sinhagad Road Real Estate, MahaRERA Projects`
  };

  // BreadcrumbList Schema
  const breadcrumbSchema: any = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://nandedcitypune.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Market Intelligence",
        "item": "https://nandedcitypune.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://nandedcitypune.com/blog/${post.slug}`
      }
    ]
  };

  // Find the related cluster for the conversion funnel CTA
  const relatedEntity = clusters.find(c => c.id === post.relatedCluster) || clusters[0];
  // Find related articles (same category, different slug)
  const relatedPosts = blogs.filter(b => b.slug !== post.slug && b.category === post.category).slice(0, 3);

  return (
    <>
      <Breadcrumbs items={[
        { name: 'Latest Insights', href: '/blog' },
        { name: post.title }
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbSchema]) }} />
      
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
              {/* Speakable headline — targeted by SpeakableSpecification */}
              <h1 className="blog-speakable-headline" style={{ color: '#fff', fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '24px' }}>
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

        {/* Speakable excerpt — hidden visually but targeted by SpeakableSpecification for Assistant */}
        <div className="blog-speakable-excerpt" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
          {post.excerpt}
        </div>

        {/* Two-column: Article + Sidebar */}
        <div className="container" style={{ padding: '60px 20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: '60px', maxWidth: '1200px', alignItems: 'start' }}>
          
          {/* Main Prose */}
          <div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} style={{ lineHeight: '1.8', color: '#334155', fontSize: '1.1rem' }} />
            <hr style={{ margin: '60px 0', border: '0', borderTop: '1px solid #e2e8f0' }} />
            <div style={{ backgroundColor: '#f8fafc', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <span style={{ color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.78rem', marginBottom: '12px', display: 'block' }}>Take the Next Step</span>
              <h3 style={{ fontSize: '1.7rem', color: '#0f172a', marginBottom: '12px' }}>Ready to Invest in Your Future?</h3>
              <p style={{ color: '#64748b', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>Explore premium MahaRERA registered projects inside Nanded City. Secure your property in Pune&apos;s most robust micro-market.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <Link href={`/cluster/${relatedEntity.id}`} className="btn btn-gold">View {relatedEntity.name}</Link>
                <Link href="/#contact" className="btn btn-outline" style={{ borderColor: '#94a3b8', color: '#475569' }}>Request Data Report</Link>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Article Meta */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
              <div style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Article Info</div>
              <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '4px', textTransform: 'capitalize' }}>{post.category.replace(/-/g, ' ')}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{post.readTime} · {post.date}</div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
                <h4 style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Related Insights</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {relatedPosts.map(rp => (
                    <Link key={rp.slug} href={`/blog/${rp.slug}`} style={{ textDecoration: 'none' }}>
                      <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '10px', fontSize: '0.82rem', fontWeight: '600', color: '#1e293b', lineHeight: '1.4' }}>
                        {rp.title}
                        <div style={{ color: '#94a3b8', fontWeight: '400', marginTop: '4px', fontSize: '0.72rem' }}>{rp.readTime}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Connect */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🏠</div>
              <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>Speak to a Specialist</h4>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', marginBottom: '18px', lineHeight: '1.5' }}>Get personalised data on projects matching your profile.</p>
              <a href="https://wa.me/917996645777" target="_blank" rel="noopener noreferrer" 
                style={{ display: 'block', padding: '12px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', fontWeight: '700', textDecoration: 'none', fontSize: '0.88rem', marginBottom: '10px' }}>
                📱 WhatsApp Expert
              </a>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem' }}>Response within 30 minutes</div>
            </div>
          </aside>
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
