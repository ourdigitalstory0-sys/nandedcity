import Image from 'next/image';
import Link from 'next/link';
import { clusters } from '../../../data/clusters';
import { notFound } from 'next/navigation';
import EnquiryForm from '../../components/EnquiryForm';
import ReraQrCode from '../../components/ReraQrCode';
import ScrollReveal from '../../components/ScrollReveal';

export async function generateStaticParams() {
  return clusters.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const cluster = clusters.find((c) => c.id === resolvedParams.id);
  if (!cluster) return {};
  return {
    title: `${cluster.name} – ${cluster.bhk} in Nanded City, Pune | MahaRERA Compliant`,
    description: `${cluster.description} ${cluster.bhk} apartments in Nanded City, Sinhagad Road, Pune. Price starts at ${cluster.price}. MahaRERA: ${cluster.rera}.`,
    keywords: `${cluster.name} Nanded City, ${cluster.bhk} Sinhagad Road Pune, ${cluster.name} price, ${cluster.name} RERA ${cluster.rera}`,
    openGraph: {
      title: `${cluster.name} | Nanded City, Pune`,
      description: cluster.description,
      url: `https://nandedcitypune.com/cluster/${cluster.id}`,
      images: [{ url: cluster.heroImage, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://nandedcitypune.com/cluster/${cluster.id}`,
    },
  };
}

export default async function ClusterPage({ params }) {
  const resolvedParams = await params;
  const cluster = clusters.find((c) => c.id === resolvedParams.id);
  if (!cluster) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Residence",
      "name": cluster.name,
      "description": cluster.description,
      "url": `https://nandedcitypune.com/cluster/${cluster.id}`,
      "image": cluster.heroImage,
      "numberOfRooms": cluster.bhk,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nanded, Sinhagad Road",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411041",
        "addressCountry": "IN"
      },
      "offers": {
        "@type": "Offer",
        "price": cluster.price,
        "priceCurrency": "INR",
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is the MahaRERA number for ${cluster.name} in Nanded City?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${cluster.name} is a MahaRERA registered project. The registration number is ${cluster.rera}.`
          }
        },
        {
          "@type": "Question",
          "name": `When is the possession date for ${cluster.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The expected possession for ${cluster.name} is ${cluster.possession}.`
          }
        },
        {
          "@type": "Question",
          "name": `What are the flat configurations available in ${cluster.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${cluster.name} offers premium ${cluster.bhk} apartments with a carpet area ranging from ${cluster.area}.`
          }
        }
      ]
    },
    {
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
          "name": cluster.name,
          "item": `https://nandedcitypune.com/cluster/${cluster.id}`
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section
        className="cluster-hero"
        style={{ 
          backgroundImage: `linear-gradient(rgba(14,38,22,0.78), rgba(14,38,22,0.78)), url('${cluster.heroImage}')`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative'
        }}
        aria-label={`${cluster.name} hero`}
      >
        <div className="container cluster-hero-content" style={{ position: 'relative' }}>
          
          {/* Top Right Floating QR */}
          {cluster.qrImage && cluster.rera !== 'Completed' && (
            <div style={{ position: 'absolute', top: '0', right: '0', background: 'rgba(255,255,255,0.95)', padding: '6px', borderRadius: '8px', zIndex: 10 }}>
              <ReraQrCode reraUrl={cluster.reraUrl} reraNumber={cluster.rera} qrImage={cluster.qrImage} />
            </div>
          )}

          <Link href="/" className="back-link">← All Projects</Link>
          <span className={`badge ${cluster.type === 'new' ? 'badge-green' : 'badge-gold'}`}>
            {cluster.status}
          </span>
          <h1>{cluster.name}</h1>
          <p className="cluster-hero-sub">{cluster.bhk} · Nanded City, Sinhagad Road, Pune</p>
        </div>
      </section>

      <main className="cluster-main">
        {/* Quick Stats */}
        <ScrollReveal yOffset={20} className="stats-bar" aria-label="Project statistics">
          <div className="container stats-grid">
            <div className="stat-item">
              <span className="stat-value">{cluster.price}</span>
              <span className="stat-label">Starting Price</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{cluster.area}</span>
              <span className="stat-label">Carpet Area</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{cluster.floors}</span>
              <span className="stat-label">Floors / Plots</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{cluster.units}</span>
              <span className="stat-label">Total Units</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{cluster.possession}</span>
              <span className="stat-label">Possession</span>
            </div>
          </div>
        </ScrollReveal>

        <section className="cluster-details-section section-padding" style={{ backgroundColor: '#fff' }}>
          <div className="container container-grid">
            
            {/* Left Content Column */}
            <div className="cluster-content-col">
              <ScrollReveal yOffset={30}>
                <h2>About {cluster.name}</h2>
                <p className="cluster-description-large">{cluster.description}</p>
                <p style={{ marginTop: '16px', color: '#6b7280', lineHeight: 1.8 }}>
                  Located in the thriving Nanded City township off Sinhagad Road, Pune, {cluster.name} is designed
                  for those who demand the very best. With {cluster.bhk} configurations crafted to maximize natural
                  light and ventilation, every residence is a sanctuary.
                </p>
              </ScrollReveal>

              <ScrollReveal yOffset={30} delay={0.2} style={{ marginTop: '50px' }}>
                <div className="highlights-grid">
                  <h3>Key Highlights</h3>
                  <ul className="highlights-list">
                    {cluster.highlights.map((h, i) => (
                      <li key={i} className="highlight-item">
                        <span className="highlight-icon">✦</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Amenities List */}
              <ScrollReveal yOffset={30} delay={0.3} style={{ marginTop: '50px' }}>
                <div className="highlights-grid">
                  <h3>Curated Lifestyle Amenities</h3>
                  <div className="amenities-grid-small" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
                    {[
                      { icon: '🏊', name: 'Swimming Pool' },
                      { icon: '🏋️', name: 'Gymnasium' },
                      { icon: '🌳', name: 'Landscaped Garden' },
                      { icon: '🎭', name: 'Clubhouse' },
                      { icon: '🔒', name: '24/7 Security' },
                      { icon: '⚡', name: 'Power Backup' }
                    ].map((a) => (
                      <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                        <span style={{ fontSize: '1.2rem' }}>{a.icon}</span>
                        <span style={{ fontSize: '0.95rem', fontWeight: '500', color: '#333' }}>{a.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Sticky Enquiry Column */}
            <div className="cluster-sidebar-col" style={{ position: 'sticky', top: '100px', height: 'fit-content', paddingBottom: '40px' }}>
              <ScrollReveal className="enquiry-card" delay={0.4}>
                <h3>Request Pricing & Plans</h3>
                <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '20px' }}>
                  Register now for exclusive {cluster.name} floor plans, latest pricing, and priority site visits.
                </p>
                <EnquiryForm clusterName={cluster.name} bhk={cluster.bhk} />
                <div className="enquiry-trust" style={{ marginTop: '24px', fontSize: '0.85rem', color: '#666', borderTop: '1px solid #eee', paddingTop: '16px' }}>
                  <div style={{ marginBottom: '8px' }}>✅ MahaRERA Verified Project</div>
                  <div style={{ marginBottom: '8px' }}>✅ Official Nanded City Developer</div>
                  <div>✅ Free Site Visit Arranged</div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </section>
      </main>

      {/* RERA Disclaimer */}
      {cluster.rera !== 'Completed' && (
        <div className="rera-disclaimer">
          <div className="container">
            <p>
              <strong>MahaRERA Disclaimer:</strong> {cluster.name} is registered under MahaRERA bearing
              registration number <strong>{cluster.rera}</strong>. For project details, visit{' '}
              <a href="https://maharerait.mahaonline.gov.in" target="_blank" rel="noopener noreferrer">
                maharerait.mahaonline.gov.in
              </a>.
              All images shown are for representation purposes only. Prices are subject to change without prior notice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
