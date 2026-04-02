import Image from 'next/image';
import { notFound } from 'next/navigation';
import EnquiryForm from '../../components/EnquiryForm';
import { clusters } from '../../../data/clusters';
import ScrollReveal from '../../components/ScrollReveal';

// Dynamic params for typical ad campaigns
export async function generateStaticParams() {
  return [
    { campaign: '2-bhk-flats' },
    { campaign: '3-bhk-luxury' },
    { campaign: 'na-bungalow-plots' }
  ];
}

const campaignData = {
  '2-bhk-flats': {
    title: 'Premium 2 BHK Homes in Nanded City',
    sub: 'MahaRERA Registered | ₹78 Lakh Onwards | 700-Acre Township',
    bhk: '2 BHK',
    clusterName: 'Aalaap',
    heroImg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    bullets: ['Spacious 720-1280 sq.ft Carpet Area', '0% Brokerage - Direct Developer Sale', 'Exclusive Pre-Launch Pricing Valid Today'],
  },
  '3-bhk-luxury': {
    title: 'Luxury 3 BHK Residences in Pune',
    sub: 'Panoramic Sahyadri Views | ₹1.45 Cr Onwards | Premium High-Rise',
    bhk: '3 BHK',
    clusterName: 'Saajgiri',
    heroImg: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    bullets: ['Massive 1,350-1,820 sq.ft Carpet Area', 'Private Lift Lobbies & Concierge', 'Infinity Pool & Club Access'],
  },
  'na-bungalow-plots': {
    title: 'Branded NA Bungalow Plots on Sinhagad Road',
    sub: 'Build Your Legacy in an Elite Community | 1200+ sq.ft | MahaRERA Verified',
    bhk: 'Branded NA Bungalow Plots',
    clusterName: 'Melody / Rhythm',
    heroImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    bullets: ['18-22% Expected Annual ROI', 'Fully Developed Internal Infrastructure', 'Exclusive Peer Group Community'],
  }
};

export default async function LandingPage({ params }) {
  const resolvedParams = await params;
  const campaign = campaignData[resolvedParams.campaign];
  if (!campaign) notFound();

  return (
    <>
      {/* Stripped LP Header */}
      <header style={{ padding: '20px 40px', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
        <Image src="https://nandedcitypune.com/wp-content/themes/nandedcity/images/nc-logo.png" alt="Nanded City Pune Official Logo" width={180} height={50} style={{ objectFit: 'contain' }} />
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

        <div className="container" style={{ position: 'relative', padding: '100px 32px 140px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' }}>
          
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {['Self-Sustaining Township', 'In-House Hospital & Schools', '200+ Acres Greenery', 'Club Harmony & Kridaangan'].map((w) => (
              <div key={w} style={{ backgroundColor: '#fff', padding: '32px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ color: 'var(--accent-gold)', fontSize: '2rem', display: 'block', marginBottom: '16px' }}>✦</span>
                <h4 style={{ color: '#1e293b', fontSize: '1.05rem' }}>{w}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Stripped Footer */}
      <footer style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          MahaRERA Registered Projects. The information provided is for general information purposes only. Images are for representation ONLY.
        </p>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '16px' }}>
          © {new Date().getFullYear()} Nanded City Developers Pune. All rights reserved.
        </p>
      </footer>
    </>
  );
}
