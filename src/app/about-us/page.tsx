import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '../components/ScrollReveal';

export const metadata: Metadata = {
  title: "About Nanded City Developers Pune | Legacy & Vision",
  description: "Discover the 25+ year legacy of Nanded City Developers. From Magarpatta City to Pune's largest self-reliant township on Sinhagad Road.",
};

export default function AboutUs() {
  const profileSchema: any = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Nanded City Developers Pune",
      "foundingDate": "2010",
      "description": "Creators of the 700-acre Nanded City Pune self-reliant township.",
      "parentOrganization": {
        "@type": "Organization",
        "name": "Magarpatta City Township Development & Construction Company Limited"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      
      <section style={{ backgroundColor: '#0f172a', padding: '120px 0 80px', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ display: 'inline-block', backgroundColor: 'var(--accent-gold)', color: '#000', padding: '6px 14px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
            Our Legacy
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '24px', lineHeight: '1.1' }}>
            Building Pune&apos;s Future
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
            Following the astronomical success of Magarpatta City, the Nanded City Development team set out to transform Sinhagad Road. Today, it stands as a 700-acre ecosystem housing over 15,000 families.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid-cols-2" style={{ alignItems: 'center' }}>
            <ScrollReveal>
              <div style={{ position: 'relative', height: '450px', borderRadius: '16px', overflow: 'hidden' }}>
                <Image 
                  src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                  alt="Nanded City Corporate Vision"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} style={{ paddingLeft: '40px' }}>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--primary-green)', marginBottom: '24px' }}>The Philosophy of Self-Reliance</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '16px' }}>
                A home is more than four walls. It requires an environment that nurtures education, health, and recreation. That is why Nanded City was conceptualized as a &quot;Self-Sustaining Eco-System&quot;.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '32px' }}>
                Our in-house <strong>Nanded City Public School</strong>, cutting-edge <strong>Symphony IT Park</strong>, fully operational Hospital, and the expansive <strong>Kridaangan sports complex</strong> ensure that the residents never have to leave the township for daily premium necessities.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid var(--accent-gold)' }}>
                  <strong style={{ display: 'block', fontSize: '1.6rem', color: 'var(--primary-green)' }}>700</strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Acres of Layout</span>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid var(--accent-gold)' }}>
                  <strong style={{ display: 'block', fontSize: '1.6rem', color: 'var(--primary-green)' }}>15,000+</strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Happy Families</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
