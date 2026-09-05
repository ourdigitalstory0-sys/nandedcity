import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '../components/ScrollReveal';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: `About ${SITE_CONFIG.brand.organizationName} | Independent Authorized Partner`,
  description: `Learn about ${SITE_CONFIG.brand.organizationName}, an Independent Authorized Channel Partner (MahaRERA: ${SITE_CONFIG.brand.rera}) offering expert property advisory for Nanded City Township Pune.`,
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/about-us`,
  },
};

export default function AboutUs() {
  const profileSchema: any = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "RealEstateAgent",
      "name": SITE_CONFIG.brand.organizationName,
      "description": `Independent Authorized Channel Partner for Nanded City Pune.`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nanded City Township, Sinhagad Road",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411041",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([profileSchema]) }}
      />
      
      <section style={{ backgroundColor: '#0f172a', padding: '120px 0 80px', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ display: 'inline-block', backgroundColor: 'var(--accent-gold)', color: '#000', padding: '6px 14px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
            About the Publisher
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '24px', lineHeight: '1.1' }}>
            Independent Property Advisory
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
            We are {SITE_CONFIG.brand.organizationName}, an <strong>Independent Authorized Channel Partner</strong> dedicated to helping families and investors navigate the 700-acre Nanded City Township ecosystem.
          </p>
        </div>
      </section>

      {/* Entity & E-E-A-T Details */}
      <section className="section-padding" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-green)' }}>Our Entity & Disclosures</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Transparency and Trust in Real Estate.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { title: 'Legal Entity', desc: `This website is operated by ${SITE_CONFIG.brand.organizationName}. We are an independent advisory firm and not the official developer.`, icon: '🏢' },
              { title: 'Developer Relationship', desc: `We are an Official Marketing & Sales Partner for ${SITE_CONFIG.brand.developerName}.`, icon: '🤝' },
              { title: 'MahaRERA Registration', desc: `We operate under MahaRERA Agent Registration Number: ${SITE_CONFIG.brand.rera}.`, icon: '📜' },
              { title: 'Data Policy', desc: 'All pricing, floor plans, and project statuses are sourced directly from MahaRERA public filings and official developer updates.', icon: '📊' }
            ].map((infra) => (
              <ScrollReveal key={infra.title} className="infra-card" style={{ padding: '30px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '20px' }}>{infra.icon}</span>
                <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '12px' }}>{infra.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{infra.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid-cols-2" style={{ alignItems: 'center' }}>
            <ScrollReveal>
              <div style={{ position: 'relative', height: '450px', borderRadius: '16px', overflow: 'hidden' }}>
                <Image 
                  src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                  alt="Nanded City Township Pune"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} style={{ paddingLeft: '40px' }}>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--primary-green)', marginBottom: '24px' }}>Why Choose an Authorized Partner?</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '16px' }}>
                Navigating a 700-acre master-planned township with over a dozen active clusters can be overwhelming. As an authorized partner, we provide <strong>unbiased, data-driven property intelligence</strong>.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '32px' }}>
                Our advisory services are completely free for buyers. We assist with site visits, inventory selection, price negotiation, and MahaRERA documentation, ensuring you make a secure and informed investment.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid var(--accent-gold)' }}>
                  <strong style={{ display: 'block', fontSize: '1.2rem', color: 'var(--primary-green)' }}>Zero Cost</strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Free Advisory Services</span>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid var(--accent-gold)' }}>
                  <strong style={{ display: 'block', fontSize: '1.2rem', color: 'var(--primary-green)' }}>End-to-End</strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Site Visit to Registration</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
