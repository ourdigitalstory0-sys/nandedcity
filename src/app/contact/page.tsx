import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/app/components/ContactForm';
import { clusters } from '@/data/clusters';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { SITE_CONFIG } from '@/config/site';


export const metadata: Metadata = {
  title: `Contact ${SITE_CONFIG.name} Sales Team | Schedule Site Visit`,
  description: `Get in touch with the official ${SITE_CONFIG.name} sales & marketing team. Call ${SITE_CONFIG.contact.phone} or visit our office at ${SITE_CONFIG.contact.address} for project brochures and site visits.`,
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/contact`,
  },
};


export default function ContactPage() {
  const ongoingClusters = clusters.filter(c => c.type === 'new');
  
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#0f172a', padding: '120px 0 80px', color: '#fff' }}>
        <div className="container">
          <Breadcrumbs 
            items={[
              { name: 'Home', href: '/' },
              { name: 'Contact', href: '/contact', current: true }
            ]} 
          />
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '16px', marginTop: '24px' }}>Contact Our Experts</h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: '1.6' }}>
            Looking for 1, 2, or 3 BHK luxury flats in Pune? Our residential advisors are ready to assist you with floor plans, pricing, and priority site visits.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
          
          {/* Left: Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '24px' }}>Corporate Presence</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem' }}>📍</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: '#0f172a', marginBottom: '4px' }}>Address</strong>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      Nanded City Township, Sinhagad Road,<br />
                      Pune, Maharashtra – 411041
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem' }}>📞</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: '#0f172a', marginBottom: '4px' }}>Phone</strong>
                    <a href={`tel:${SITE_CONFIG.contact.phoneNumeric}`} style={{ color: 'var(--primary-green)', textDecoration: 'none', fontWeight: '700', fontSize: '1.1rem' }}>{SITE_CONFIG.contact.phone}</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem' }}>✉️</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: '#0f172a', marginBottom: '4px' }}>Email</strong>
                    <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#64748b', textDecoration: 'none' }}>{SITE_CONFIG.contact.email}</a>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '16px' }}>Office Hours</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Mon – Sat:</span>
                  <span style={{ color: '#0f172a', fontWeight: '600' }}>9:00 AM – 8:00 PM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Sunday:</span>
                  <span style={{ color: '#0f172a', fontWeight: '600' }}>10:00 AM – 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: '100px' }}>
              <ContactForm ongoingClusters={ongoingClusters} />
            </div>
          </div>

        </div>
      </section>
      
      {/* Map Placeholder or Actual Embed could go here */}
      <section style={{ height: '450px', backgroundColor: '#e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ color: '#64748b', fontWeight: '600' }}>Interactive Development Map — Nanded City Township</span>
      </section>
    </div>
  );
}
