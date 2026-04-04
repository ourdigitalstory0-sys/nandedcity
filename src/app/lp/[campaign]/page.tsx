import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import EnquiryForm from '../../components/EnquiryForm';
import { clusters } from '../../../data/clusters';
import ScrollReveal from '../../components/ScrollReveal';

import { Metadata } from 'next';

interface CampaignParams {
  campaign: string;
}

// Dynamic params for typical ad campaigns
export async function generateStaticParams() {
  return [
    { campaign: '2-bhk-flats' },
    { campaign: '3-bhk-luxury' },
    { campaign: 'na-bungalow-plots' }
  ];
}

export async function generateMetadata({ params }: { params: Promise<CampaignParams> }): Promise<Metadata> {
  const resolvedParams = await params;
  const campaign = campaignData[resolvedParams.campaign];
  if (!campaign) return { title: 'Nanded City | Premium Residences' };

  return {
    title: `${campaign.title} | Nanded City Official Sales`,
    description: `Official Sales Partner for ${campaign.title} in Nanded City. ${campaign.sub}. Book your priority site visit today.`,
    openGraph: {
      title: campaign.title,
      description: campaign.sub,
      images: [{ url: campaign.heroImg, width: 1200, height: 630 }],
    }
  };
}

interface CampaignInfo {
  title: string;
  sub: string;
  bhk: string;
  clusterName: string;
  heroImg: string;
  bullets: string[];
}

const campaignData: Record<string, CampaignInfo> = {
  '2-bhk-flats': {
    title: 'Premium 2 BHK Homes in Nanded City',
    sub: 'MahaRERA Registered | ₹78 Lakh Onwards | 700-Acre Township',
    bhk: '2 BHK',
    clusterName: 'Aalaap',
    heroImg: 'https://nandedcitypune.com/aalaap/assets/img/img-hero-banner-02.jpg',
    bullets: ['Spacious 720-1280 sq.ft Carpet Area', '0% Brokerage - Direct Developer Sale', 'Exclusive Pre-Launch Pricing Valid Today'],
  },
  '3-bhk-luxury': {
    title: 'Luxury 3 BHK Residences in Pune',
    sub: 'Premium Township Signature Living | ₹1.45 Cr Onwards',
    bhk: '3 BHK',
    clusterName: 'Saajgiri',
    heroImg: 'https://nandedcitypune.com/wp-content/uploads/2026/02/saajgiri-ncp-banner-img-01.webp',
    bullets: ['Panoramic Sahyadri Hill Views', 'High Floor Exclusive Availability', 'MahaRERA Verified Project Status'],
  },
  'na-bungalow-plots': {
    title: 'Signature NA Bungalow Plots Pune',
    sub: 'Gated Township Estate | Build Your Own Villa | ROI Growth',
    bhk: 'Plots',
    clusterName: 'Melody I',
    heroImg: 'https://nandedcitypune.com/wp-content/uploads/2023/08/Melody-I_Rera.jpeg',
    bullets: ['High Appreciation Plots Sinhagad Road', 'Premium Infrastructure & Road Access', '1,200 - 3,500 sq.ft Plot Area Configurations'],
  },
};

export default async function LandingPage({ params }: { params: Promise<CampaignParams> }) {
  const resolvedParams = await params;
  const campaign = campaignData[resolvedParams.campaign];
  if (!campaign) notFound();

  // Campaign-specific RealEstateAgent & Product Schema
  const lpSchema: any = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": `Nanded City Official Sales - ${campaign.title}`,
    "description": campaign.sub,
    "url": `https://www.nanded-city.in/lp/${resolvedParams.campaign}`,
    "image": campaign.heroImg,
    "telephone": "+91-20-67500000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nanded, Sinhagad Road",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411041",
      "addressCountry": "IN"
    },
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Accommodation",
        "name": campaign.clusterName,
        "description": campaign.title
      }
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lpSchema) }} />
      {/* Stripped LP Header */}
      <header style={{ padding: '20px 40px', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
        <Image src="/nc-logo.png" alt="Nanded City Pune Official Logo" width={180} height={50} style={{ objectFit: 'contain' }} />
      </header>

      {/* Hero / Above the Fold Conversion Trap */}
      <section style={{ backgroundColor: '#0f172a', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <Image
          src={campaign.heroImg}
          alt={campaign.title}
          fill
          priority
          fetchPriority="high"
          style={{ objectFit: 'cover', opacity: 0.3 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 100%)' }} />

        <div className="container lp-hero-grid" style={{ position: 'relative', padding: '100px 32px 140px' }}>
          
          <div style={{ maxWidth: '640px' }}>
            <span style={{ display: 'inline-block', backgroundColor: 'var(--accent-gold)', color: '#000', padding: '6px 14px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
              Official Nanded City Campaign
            </span>
            <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px', color: '#fff' }}>
              {campaign.title}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', fontWeight: '500' }}>
              {campaign.sub}
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {campaign.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '1.1rem', color: '#e2e8f0' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✔</span> {b}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '40px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--accent-gold)' }}>15k+</strong>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Happy Families</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--accent-gold)' }}>700</strong>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Acres of Lifestyle</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--accent-gold)' }}>100%</strong>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>MahaRERA Verified</span>
              </div>
            </div>
          </div>

          {/* Hardcoded Sticky Lead Form */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <h3 style={{ color: '#0f172a', fontSize: '1.4rem', marginBottom: '8px', textAlign: 'center' }}>Unlock Exclusive Web Pricing</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px', textAlign: 'center' }}>Leave your details below. Our senior advisor will call you within 15 minutes.</p>
            <EnquiryForm clusterName={campaign.clusterName} bhk={campaign.bhk} />
          </div>

        </div>
      </section>

      {/* Trust Builders */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '40px' }}>Why Families Choose Nanded City</h2>
          <div className="lp-trust-grid">
            {['Self-Sustaining Township', 'In-House Hospital & Schools', '200+ Acres Greenery', 'Club Harmony & Kridaangan'].map((w) => (
              <div key={w} style={{ backgroundColor: '#fff', padding: '32px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ color: 'var(--accent-gold)', fontSize: '2rem', display: 'block', marginBottom: '16px' }}>✦</span>
                <h4 style={{ color: '#1e293b', fontSize: '1.05rem' }}>{w}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Stripped Footer with Authorization Disclaimer */}
      <footer style={{ padding: '60px 40px', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.82rem', color: 'rgba(15, 23, 42, 0.45)', lineHeight: '1.7', marginBottom: '24px' }}>
            <strong style={{ color: '#0f172a' }}>Disclaimer:</strong> PropSmart Realty (Authorized Partner ID: A7744009295) is an <strong>Official Marketing & Sales Partner</strong> for Nanded City Pune. The project information, images, and pricing provided on this landing page are for representational and informational purposes only and are subject to change without notice. This website does not constitute an official offer from the developer. All trademarks, logos, and project names are the property of their respective owners.
          </p>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            © {new Date().getFullYear()} Nanded City Pune Residences. All rights reserved. | Authorized Marketing Channel
          </div>
        </div>
      </footer>
    </>
  );
}
