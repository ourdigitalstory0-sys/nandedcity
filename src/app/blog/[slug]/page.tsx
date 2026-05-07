import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { blogs } from '../../../data/blogs';
import { clusters } from '../../../data/clusters';
import { authors } from '../../../data/authors';
import Breadcrumbs from '../../components/Breadcrumbs';
import { BlogPosting, BreadcrumbList, WithContext, SpeakableSpecification } from 'schema-dts';
import { SITE_CONFIG } from '@/config/site';


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
    title: `${post.title} | Nanded City Official Insights`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/blog/${post.slug}`,
    },

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_CONFIG.baseUrl}/blog/${post.slug}`,

      type: 'article',
      publishedTime: post.date,
      authors: [authors.find(a => a.id === post.author)?.name || post.author],
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

  const author = authors.find(a => a.id === post.author);

  // Find the related cluster for the conversion funnel CTA
  const relatedEntity = clusters.find(c => c.id === post.relatedCluster) || clusters[0];
  // Find related articles (same category, different slug)
  const relatedPosts = blogs.filter(b => b.slug !== post.slug && b.category === post.category).slice(0, 3);
  
  // Enhanced BlogPosting Schema with Speakable + E-E-A-T
  const jsonLdBase: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.baseUrl}/blog/${post.slug}`
    },

    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,  
    "author": {
      "@type": "Person",
      "name": authors.find(a => a.id === post.author)?.name || "Nanded City Intelligence Team",
      "url": `${SITE_CONFIG.baseUrl}/about-us`,
      "jobTitle": authors.find(a => a.id === post.author)?.role || "Senior Analyst"
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.brand.developerName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseUrl}${SITE_CONFIG.brand.logo}`
      },
      "@id": `${SITE_CONFIG.baseUrl}/#organization`
    },

    "datePublished": post.date,
    "dateModified": post.date,
    "inLanguage": "en-IN",
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.baseUrl}/#website`
    },

    // Speakable — enables Google Assistant and SGE audio answers
    "speakable": {
      "@type": "SpeakableSpecification",
      "xpath": [".blog-speakable-headline", ".blog-speakable-excerpt"]
    },
    "about": [
      {
        "@type": "Place",
        "name": SITE_CONFIG.name,
        "sameAs": SITE_CONFIG.baseUrl
      },

      {
        "@type": "Thing",
        "name": "Real Estate Investment in Pune",
        "sameAs": "https://en.wikipedia.org/wiki/Real_estate_in_India"
      }
    ],
    "mentions": [
      {
        "@type": "Accommodation",
        "name": relatedEntity.name,
        "url": `${SITE_CONFIG.baseUrl}/cluster/${relatedEntity.id}`
      },

      {
        "@type": "Place",
        "name": "Sinhagad Road Pune",
        "sameAs": "https://en.wikipedia.org/wiki/Sinhagad_Road"
      }
    ],
    "keywords": `${post.category}, Nanded City Pune, Sinhagad Road Real Estate, MahaRERA Projects`
  };

  // BreadcrumbList Schema
  const breadcrumbSchema: any = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_CONFIG.baseUrl}/blog/${post.slug}/#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_CONFIG.baseUrl
      },

      {
        "@type": "ListItem",
        "position": 2,
        "name": "Market Intelligence",
        "item": `${SITE_CONFIG.baseUrl}/blog`
      },

      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${SITE_CONFIG.baseUrl}/blog/${post.slug}`
      }

    ]
  };

  const webpageSchema: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_CONFIG.baseUrl}/blog/${post.slug}/#webpage`,
    "url": `${SITE_CONFIG.baseUrl}/blog/${post.slug}`,
    "name": post.title,
    "description": post.excerpt,
    "isPartOf": { "@id": `${SITE_CONFIG.baseUrl}/#website` },
    "breadcrumb": { "@id": `${SITE_CONFIG.baseUrl}/blog/${post.slug}/#breadcrumb` },
    "publisher": { "@id": `${SITE_CONFIG.baseUrl}/#organization` }
  };

  const jsonLd: any[] = [jsonLdBase, webpageSchema, breadcrumbSchema];

  return (
    <>
      <Breadcrumbs items={[
        { name: 'Latest Insights', href: '/blog' },
        { name: post.title }
      ]} />
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
              {/* Speakable headline — targeted by SpeakableSpecification */}
              <h1 className="blog-speakable-headline" style={{ color: '#fff', fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '24px' }}>
                {post.title}
              </h1>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>✏️ {author?.name || post.author}</span>
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

            {/* Editorial Authority Bio */}
            {author && (
              <div style={{ marginTop: '60px', padding: '40px', backgroundColor: '#f8fafc', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '100px', 
                    backgroundColor: 'var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: '#fff',
                    fontWeight: '800'
                  }}>
                    {author.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>{author.name}</h4>
                    <p style={{ margin: '4px 0 12px 0', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: '600' }}>{author.role}</p>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6' }}>{author.bio}</p>
                    <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                      {author.specialization.map(s => (
                        <span key={s} style={{ fontSize: '0.75rem', padding: '4px 12px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '100px', color: '#475569' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
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
              <a href={SITE_CONFIG.contact.whatsapp} target="_blank" rel="noopener noreferrer" 
                style={{ display: 'block', padding: '12px', backgroundColor: '#25D366', color: '#fff', borderRadius: '100px', fontWeight: '700', textDecoration: 'none', fontSize: '0.88rem', marginBottom: '10px' }}>
                📱 {SITE_CONFIG.contact.whatsappPrompt}
              </a>
              <a href={`tel:${SITE_CONFIG.contact.phoneNumeric}`} 
                style={{ display: 'block', padding: '12px', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '100px', fontWeight: '700', textDecoration: 'none', fontSize: '0.88rem', marginBottom: '10px' }}>
                📞 Call {SITE_CONFIG.contact.phone}
              </a>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem', marginBottom: '12px' }}>Response within 30 minutes</div>
              <a href={`mailto:${SITE_CONFIG.contact.email}`} 
                style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', textDecoration: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                📧 {SITE_CONFIG.contact.email}
              </a>

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
