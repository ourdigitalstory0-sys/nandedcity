import React from 'react';
import { Metadata } from 'next';
import DynamicClusterGrid from '@/app/components/DynamicClusterGrid';
import { clusters } from '@/data/clusters';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { Cluster } from '@/types';
import { SITE_CONFIG } from '@/config/site';


export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} Residential Clusters | Ongoing & Ready to Move Projects`,
  description: `Explore all residential clusters in ${SITE_CONFIG.name} Pune. Discover floor plans, prices, and MahaRERA details for Asawari, Sargam, Saajgiri, and Aalaap projects near Sinhagad Road.`,
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/projects`,
  },
};


export default function ProjectsPage() {
  const ongoingClusters = clusters.filter((c: Cluster) => c.type === 'new');
  const completedClusters = clusters.filter((c: Cluster) => c.type === 'completed');
  
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#0f172a', padding: '120px 0 60px', color: '#fff' }}>
        <div className="container">
          <Breadcrumbs 
            items={[
              { name: 'Home', href: '/' },
              { name: 'Residential Clusters', href: '/projects', current: true }
            ]} 
          />
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '16px', marginTop: '24px' }}>Nanded City Residential Portfolio</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', lineHeight: '1.6' }}>
            Explore the diversity of high-end urban living. From high-rise asavari towers to executive bageshree clusters, find your dream home in Pune&apos;s most self-reliant township.
          </p>
        </div>
      </section>

      {/* Main projects grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '12px' }}>MahaRERA Verified Towers</h2>
            <p style={{ color: '#64748b' }}>Our current residential projects offer premium 1, 2, 2.5, and 3 BHK configurations.</p>
          </div>
          
          <DynamicClusterGrid clusters={clusters} />
        </div>
      </section>

      {/* Completed Registry Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '12px' }}>Ready to Move-In Clusters</h2>
            <p style={{ color: '#64748b' }}>Explore completed projects with verified resale availability and thriving communities.</p>
          </div>
          
          {/* We use the same grid for completed projects here or a custom small grid */}
          <DynamicClusterGrid clusters={completedClusters} />
        </div>
      </section>
      
      {/* Call to Action */}
      <section style={{ padding: '100px 0', backgroundColor: 'var(--accent-gold)', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '24px' }}>Ready for a Priority Site Visit?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 }}>Connect with our certified investment advisors today.</p>
          <a 
            href={`tel:${SITE_CONFIG.contact.phoneNumeric}`} 
            style={{ 
              backgroundColor: '#0f172a', 
              color: '#fff', 
              padding: '20px 40px', 
              borderRadius: '100px', 
              textDecoration: 'none', 
              fontWeight: '700', 
              fontSize: '1.2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            Call {SITE_CONFIG.contact.phone}
          </a>

        </div>
      </section>
    </div>
  );
}
