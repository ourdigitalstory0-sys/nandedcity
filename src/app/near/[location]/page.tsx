import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations } from '../../../data/locations';
import { SITE_CONFIG } from '@/config/site';
import DynamicHeader from '../../components/DynamicHeader';
import SearchIntelligence from '../../components/SearchIntelligence';
import ROICalculator from '../../components/ROICalculator';
import Testimonials from '../../components/Testimonials';

interface LocationParams {
  location: string;
}

export async function generateStaticParams() {
  return locations.map((loc) => ({
    location: loc.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<LocationParams> }): Promise<Metadata> {
  const resolvedParams = await params;
  const loc = locations.find((l) => l.slug === resolvedParams.location);
  if (!loc) return {};
  
  return {
    title: `Premium Flats near ${loc.name} Pune | Nanded City Township`,
    description: `Looking for flats near ${loc.name}? Discover Nanded City Township Pune, just ${loc.distance} away. Explore premium 2, 2.5, & 3 BHK apartments and NA plots with MahaRERA compliance.`,
    keywords: `Flats near ${loc.name}, Real Estate near ${loc.name}, 2 BHK near ${loc.name}, 3 BHK near ${loc.name}, Nanded City Township Pune near ${loc.name}, ${SITE_CONFIG.seo.primaryKeywords}`,
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/near/${loc.slug}`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<LocationParams> }) {
  const resolvedParams = await params;
  const loc = locations.find((l) => l.slug === resolvedParams.location);
  if (!loc) notFound();

  return (
    <main>
      <DynamicHeader />
      
      {/* Hero Section */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', backgroundColor: '#0f172a', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '24px', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Premium Real Estate Near {loc.name}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '32px' }}>
            Why settle for crowded spaces when you can upgrade to a 700-acre township lifestyle? 
            Nanded City Township Pune is just <strong>{loc.distance}</strong> from {loc.name}, offering unmatched luxury, MahaRERA compliant properties, and serene river views.
          </p>
          <a href="#explore" className="btn" style={{ padding: '16px 32px', backgroundColor: 'var(--accent-gold)', color: '#0f172a', borderRadius: '100px', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>
            Explore Township Projects
          </a>
        </div>
      </section>

      <div id="explore">
        <SearchIntelligence />
      </div>

      <ROICalculator />
      <Testimonials />
      
      {/* Footer SEO Block */}
      <section style={{ padding: '60px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>
            The Best Alternative to Buying a Flat in {loc.name}
          </h2>
          <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '0.95rem' }}>
            If you are searching for new projects, ready possession flats, or NA bungalow plots near {loc.name}, 
            Nanded City Township Pune provides a vastly superior living ecosystem. With its own public school, hospital, 
            Destination Centre, and Symphony IT Park, you gain access to world-class amenities only {loc.distance} away from {loc.name}.
          </p>
        </div>
      </section>
    </main>
  );
}
