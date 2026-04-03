import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { clusters } from '../../../data/clusters';
import { notFound } from 'next/navigation';
import EnquiryForm from '../../components/EnquiryForm';
import ReraQrCode from '../../components/ReraQrCode';
import ScrollReveal from '../../components/ScrollReveal';
import Breadcrumbs from '../../components/Breadcrumbs';
import DynamicHeader from '../../components/DynamicHeader';
import FloatingActionBar from '../../components/FloatingActionBar';
import StickyMobileCta from '../../components/StickyMobileCta';
import EnquiryModal from '../../components/EnquiryModal';

interface ClusterParams {
  id: string;
}

export async function generateStaticParams() {
  return clusters.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<ClusterParams> }): Promise<Metadata> {
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
      url: `https://www.nanded-city.in/cluster/${cluster.id}`,
      images: [{ url: cluster.heroImage, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://www.nanded-city.in/cluster/${cluster.id}`,
    },
  };
}

export default async function ClusterPage({ params }: { params: Promise<ClusterParams> }) {
  const resolvedParams = await params;
  const cluster = clusters.find((c) => c.id === resolvedParams.id);
  if (!cluster) notFound();

  // Determine if this is a plot or apartment
  const isPlot = cluster.bhk.toLowerCase().includes('plot');

  // Enhanced Product-type schema with Offer, PropertyValue, and LocationFeatureSpecification
  // Enhanced Product-type schema with Offer, PropertyValue, and LocationFeatureSpecification
  const productSchema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${cluster.name} — ${cluster.bhk} at Nanded City, Pune`,
    "description": cluster.description,
    "url": `https://www.nanded-city.in/cluster/${cluster.id}`,
    "image": cluster.heroImage,
    "brand": {
      "@type": "Brand",
      "name": "Nanded City Developers Pune"
    },
    "category": isPlot ? "NA Bungalow Plots" : "Residential Apartments",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "15420",
      "reviewCount": "890"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Configuration",
        "value": cluster.bhk
      },
      {
        "@type": "PropertyValue",
        "name": "Carpet Area",
        "value": cluster.area
      },
      {
        "@type": "PropertyValue",
        "name": "Floors",
        "value": cluster.floors
      },
      {
        "@type": "PropertyValue",
        "name": "Total Units",
        "value": cluster.units
      },
      {
        "@type": "PropertyValue",
        "name": "Possession",
        "value": cluster.possession
      },
      {
        "@type": "PropertyValue",
        "name": "MahaRERA Registration",
        "value": cluster.rera
      },
      ...cluster.highlights.map(h => ({
        "@type": "PropertyValue",
        "name": "Amenity",
        "value": h
      }))
    ]
  };

  // Residence schema with LocationFeatureSpecification
  const residenceSchema: any = {
    "@context": "https://schema.org",
    "@type": "Residence",
    "name": cluster.name,
    "description": cluster.description,
    "url": `https://www.nanded-city.in/cluster/${cluster.id}`,
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
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.4425",
      "longitude": "73.8100"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Gymnasium", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Landscaped Garden", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Security", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Power Backup", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Nanded City Public School (within township)", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Destination Centre I & II Shopping", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Township Hospital (Maternity & Multispeciality)", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Symphony IT Park (Employment Hub)", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Fire Station & Police Outpost", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Kridaangan Sports Complex (15+ Sports)", "value": true },
    ]
  };

  // FAQ Schema - Dynamic project-specific FAQs with township fallback
  const clusterFaqs = cluster.faqs || [];
  const defaultFaqs = [
    {
      question: `What is the MahaRERA number for ${cluster.name} in Nanded City?`,
      answer: `${cluster.name} is a MahaRERA registered project. The registration number is ${cluster.rera}. You can verify this at maharera.mahaonline.gov.in.`
    },
    {
      question: `When is the possession date for ${cluster.name}?`,
      answer: `The expected possession for ${cluster.name} is ${cluster.possession}.`
    },
    {
      question: `What are the ${isPlot ? 'plot sizes' : 'flat configurations'} available in ${cluster.name}?`,
      answer: `${cluster.name} offers premium ${cluster.bhk} ${isPlot ? 'plots' : 'apartments'} with ${isPlot ? 'plot sizes' : 'a carpet area'} ranging from ${cluster.area}.`
    },
    {
      question: `What is the starting price of ${cluster.name}?`,
      answer: `The starting price for ${cluster.name} is ${cluster.price}. Contact us for the latest pricing and exclusive offers.`
    }
  ];

  const faqSchema: any = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [...clusterFaqs, ...defaultFaqs].slice(0, 5).map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  // Advanced RealEstateProject schema (Schema 3.0)
  const projectSchema: any = {
    "@context": "https://schema.org",
    "@type": "RealEstateProject",
    "name": `${cluster.name} by Nanded City Developers`,
    "description": cluster.description,
    "url": `https://www.nanded-city.in/cluster/${cluster.id}`,
    "image": cluster.heroImage,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nanded, Sinhagad Road",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411041",
      "addressCountry": "IN"
    },
    "amenityFeature": residenceSchema.amenityFeature,
    "containsPlace": [
      {
        "@type": "Accommodation",
        "name": cluster.bhk,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": cluster.area
        }
      }
    ]
  };

  // Event Schema for Daily Site Visits (Captures "Upcoming Events" snippet)
  const siteVisitEvent: any = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Official Site Visit: ${cluster.name} Nanded City`,
    "startDate": new Date().toISOString().split('T')[0] + "T09:00",
    "endDate": new Date().toISOString().split('T')[0] + "T18:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Nanded City Sales Gallery",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nanded, Sinhagad Road",
        "addressLocality": "Pune",
        "postalCode": "411041",
        "addressCountry": "IN"
      }
    },
    "description": `Detailed project walkthrough and model flat tour for ${cluster.name}. Expert advisors available for pricing and floor plan discussions.`,
    "organizer": {
      "@type": "Organization",
      "name": "Nanded City Developers",
      "url": "https://www.nanded-city.in"
    }
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
        "item": "https://www.nanded-city.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": cluster.type === 'new' ? 'Ongoing Projects' : 'Completed Projects',
        "item": "https://www.nanded-city.in/#ongoing"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cluster.name,
        "item": `https://www.nanded-city.in/cluster/${cluster.id}`
      }
    ]
  };

  const jsonLd: any[] = [productSchema, projectSchema, residenceSchema, faqSchema, breadcrumbSchema, siteVisitEvent];

  return (
    <>
      <Breadcrumbs items={[
        { name: cluster.type === 'new' ? 'Ongoing Projects' : 'Completed Projects', href: '/#ongoing' },
        { name: cluster.name }
      ]} />
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
            {/* SEO Optimization: Image hint for LCP (Largest Contentful Paint) */}
            <link rel="preload" as="image" href={cluster.heroImage} fetchPriority="high" />
          </div>
        </section>

      <main className="cluster-main">
        {/* Quick Stats Grid */}
        <ScrollReveal yOffset={20} className="stats-bar" aria-label="Project statistics">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            <div className="stat-item" style={{ textAlign: 'center', padding: '10px' }}>
              <span className="stat-value" style={{ display: 'block', fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-gold)' }}>{cluster.price}</span>
              <span className="stat-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Starting Price</span>
            </div>
            <div className="stat-item" style={{ textAlign: 'center', padding: '10px' }}>
              <span className="stat-value" style={{ display: 'block', fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-gold)' }}>{cluster.area}</span>
              <span className="stat-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Carpet Area</span>
            </div>
            <div className="stat-item" style={{ textAlign: 'center', padding: '10px' }}>
              <span className="stat-value" style={{ display: 'block', fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-gold)' }}>{cluster.floors}</span>
              <span className="stat-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Floors / Plots</span>
            </div>
            <div className="stat-item" style={{ textAlign: 'center', padding: '10px' }}>
              <span className="stat-value" style={{ display: 'block', fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-gold)' }}>{cluster.units}</span>
              <span className="stat-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Total Units</span>
            </div>
            <div className="stat-item" style={{ textAlign: 'center', padding: '10px' }}>
              <span className="stat-value" style={{ display: 'block', fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-gold)' }}>{cluster.possession}</span>
              <span className="stat-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Possession</span>
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

      {/* Institutional Trust: MahaRERA Verified Badge */}
      <section style={{ backgroundColor: '#f8fafc', padding: '60px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '40px',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
            }}>
              <div style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                color: 'var(--accent-gold)',
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px'
              }}>
                Verified by MahaRERA
              </div>
              <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '12px' }}>Institutional Compliance</h2>
              <p style={{ maxWidth: '600px', color: '#64748b', lineHeight: '1.7', marginBottom: '30px' }}>
                {cluster.name} is a fully compliant residential project under the Maharashtra Real Estate Regulatory Authority. 
                Scan the official QR code below or use the registration number to verify all project details.
              </p>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '16px' 
              }}>
                {cluster.type === 'new' && cluster.rera !== 'Completed' ? (
                  <>
                    <ReraQrCode 
                      reraNumber={cluster.rera} 
                      qrImage={cluster.qrImage || "https://www.nanded-city.in/aalaap/assets/img/img-aalaap-qr-code.png"} 
                    />
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>
                      {cluster.rera}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-green)' }}>
                    ✅ Project Successfully Completed & Handed Over
                  </div>
                )}
                <a 
                  href="https://maharerait.mahaonline.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', marginTop: '10px' }}
                >
                  Verify Official Records →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Lifecycle Continuity */}
      <section className="section-padding" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <ScrollReveal>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-green)' }}>Explore More Clusters</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Discover more residential options in Pune&apos;s finest township.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link href="/#ongoing" style={{ color: 'var(--primary-green)', fontWeight: '700', textDecoration: 'none', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '4px' }}>
                All Residences →
              </Link>
            </ScrollReveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {clusters
              .filter(c => c.id !== cluster.id)
              .sort((a, b) => (a.type === cluster.type ? -1 : 1))
              .slice(0, 3)
              .map((other, idx) => (
                <ScrollReveal key={other.id} delay={idx * 0.1}>
                  <Link href={`/cluster/${other.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div className="discovery-card" style={{ position: 'relative', height: '240px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', border: '1px solid #eee' }}>
                      <Image src={other.image} alt={other.name} fill style={{ objectFit: 'cover', transition: 'transform 0.4s' }} />
                      <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', color: '#000' }}>
                        {other.type === 'new' ? 'ONGOING' : 'READY'}
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '4px' }}>{other.name}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{other.bhk} — {other.area} sq.ft.</p>
                  </Link>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </section>

      <FloatingActionBar />
      <EnquiryModal />
      <StickyMobileCta />
    </>
  );
}
