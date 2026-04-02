import React from "react";
import { Metadata } from "next";
import { Outfit } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import Link from 'next/link';
import Image from 'next/image';
import TransitionFrame from './components/TransitionFrame';
import DynamicHeader from './components/DynamicHeader';
import FloatingActionBar from './components/FloatingActionBar';
import EnquiryModal from './components/EnquiryModal';
import { ModalProvider } from './context/ModalContext';
import { Organization, WebSite, WithContext } from 'schema-dts';
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Nanded City Pune | Premium Luxury Residential Flats",
    template: "%s | Nanded City Pune",
  },
  description: "Explore premium 2, 2.5 & 3 BHK luxury residential apartments in Nanded City, Sinhagad Road, Pune. MahaRERA compliant eco-friendly township with world-class amenities.",
  keywords: "Nanded City Pune, Luxury Flats Pune, Sinhagad Road apartments, MahaRERA compliant homes, 2BHK Nanded City, 3BHK Nanded City, Melody Nanded City, Aalaap, Saajgiri",
  metadataBase: new URL("https://www.nanded-city.in"),
  verification: {
    google: "EO-ezSz-FlhAk-eKdIWOB9xTRFXojS-rHXyMVZPAyQs",
    yandex: "pending-yandex-verification-id",
    other: {
      me: ['info@nanded-city.in', 'https://www.nanded-city.in'],
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Nanded City Pune | Premium Residential Flats",
    description: "Exclusive residential clusters — Melody, Aalaap, and Saajgiri. 700 Acres of eco-friendly luxury living on Sinhagad Road, Pune.",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
  },
  openGraph: {
    title: "Nanded City Pune | Built on Trust",
    description: "Exclusive residential clusters — Melody, Aalaap, and Saajgiri. 700 Acres of eco-friendly luxury living on Sinhagad Road, Pune.",
    url: "https://www.nanded-city.in",
    siteName: "Nanded City Pune Residences",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Nanded City Pune Residential Township",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://www.nanded-city.in',
    languages: {
      'en-IN': 'https://www.nanded-city.in',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmEnabled = GTM_ID !== 'GTM-XXXXXXX';
  const organizationSchema: any = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://www.nanded-city.in/#organization",
    "name": "Nanded City Developers Pune",
    "alternateName": "Nanded City Pune",
    "url": "https://www.nanded-city.in",
    "logo": "https://www.nanded-city.in/official-logo.png", // Corrected logo placeholder if needed, otherwise nanded-city.in version
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "description": "Pune's most aspiring self-reliant township on Sinhagad Road. 700+ acres of curated luxury living with 15,000+ families. Premium 2, 2.5, 3 BHK apartments and branded NA bungalow plots.",
    "telephone": "+917996645777",
    "email": "info@nanded-city.in",
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
      "latitude": 18.4425,
      "longitude": 73.81
    },
    "areaServed": {
      "@type": "City",
      "name": "Pune"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/nandedcitypune",
      "https://www.instagram.com/nandedcitypune"
    ],
    "knowsAbout": [
      "Real Estate Investment in Pune",
      "Luxury Apartments Sinhagad Road",
      "NA Bungalow Plots Pune",
      "MahaRERA Registered Projects",
      "Township Living Pune"
    ]
  };

  // WebSite Schema with SearchAction — Sitelinks Search Box eligibility
  const websiteSchema: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.nanded-city.in/#website",
    "name": "Nanded City Pune Residences",
    "url": "https://www.nanded-city.in",
    "description": "Official residential platform for Nanded City Township, Sinhagad Road, Pune — premium apartments and branded NA bungalow plots.",
    "publisher": {
      "@id": "https://www.nanded-city.in/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.nanded-city.in/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-IN"
  };

  return (
    <html lang="en">
      {gtmEnabled && <GoogleTagManager gtmId={GTM_ID} />}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.nanded-city.in" />
      </head>
      <body className={outfit.className}>
        <ModalProvider>
          <DynamicHeader />

          <TransitionFrame>
            <main id="main-content" role="main">{children}</main>
          </TransitionFrame>

          <footer id="site-footer" role="contentinfo" style={{ backgroundColor: '#080f1e', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
              
              {/* Top 4-column grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '60px' }}>
                
                {/* Column 1: Brand */}
                <div>
                  <Image 
                    src="https://www.nanded-city.in/wp-content/themes/nandedcity/images/nc-logo.png" 
                    alt="Nanded City Pune Official Logo" 
                    width={140} height={40}
                    style={{ objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.9)', marginBottom: '20px' }}
                  />
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: '1.7', maxWidth: '240px', marginBottom: '24px' }}>
                    Pune&apos;s most aspiring township on Sinhagad Road. 700 Acres of curated, self-reliant luxury living for the professional elite.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="tel:+917996645777" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none' }}>📞 +91 7996645777</a>
                    <a href="mailto:info@nanded-city.in" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none' }}>✉️ info@nanded-city.in</a>
                    <a href="https://wa.me/917996645777" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '0.85rem', textDecoration: 'none' }}>📱 WhatsApp Expert</a>
                  </div>
                </div>

                {/* Column 2: Residential Projects Hub */}
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Nanded City Gambit</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { name: 'Melody I — Bungalow Plots', href: '/cluster/melody-1' },
                      { name: 'Melody II — Bungalow Plots', href: '/cluster/melody-2' },
                      { name: 'Melody III — Bungalow Plots', href: '/cluster/melody-3' },
                      { name: 'Aalaap-I — 2 & 3 BHK', href: '/cluster/aalaap-1' },
                      { name: 'Saajgiri — 3 BHK Luxury', href: '/cluster/saajgiri' },
                      { name: 'Rhythm — Premium Plots', href: '/cluster/rhythm-1' },
                    ].map(p => (
                      <li key={p.name}>
                        <Link href={p.href} className="footer-link" style={{ fontWeight: '500' }}>{p.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Market Intelligence */}
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Market Insights</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { name: 'Branded NA Plot Community', href: '/blog/branded-na-bungalow-plots-nanded-city-community' },
                      { name: 'Infrastructure Impact 2026', href: '/blog/sinhgad-road-flyover-impact-2026' },
                      { name: 'Township ROI Analysis', href: '/blog/nanded-city-vs-standalone-projects-roi' },
                      { name: 'Professional Plot Guide', href: '/blog/na-plots-sinhagad-road-doctors-professionals' },
                    ].map(b => (
                       <li key={b.name}>
                        <Link href={b.href} className="footer-link">{b.name}</Link>
                      </li>
                    ))}
                    <li style={{ marginTop: '8px' }}>
                      <Link href="/blog" style={{ color: 'var(--accent-gold)', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none' }}>All Intelligence →</Link>
                    </li>
                  </ul>
                </div>

                {/* Column 4: MahaRERA Compliance Hub */}
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>MahaRERA Registered</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {[
                      { name: 'Melody I', rera: 'P52100051948', href: '/cluster/melody-1' },
                      { name: 'Melody II', rera: 'P52100051867', href: '/cluster/melody-2' },
                      { name: 'Aalaap-I', rera: 'P52100055134', href: '/cluster/aalaap-1' },
                      { name: 'Saajgiri', rera: 'PR1260002501621', href: '/cluster/saajgiri' },
                      { name: 'Rhythm', rera: 'P52100028606', href: '/cluster/rhythm-1' },
                    ].map(r => (
                      <li key={r.name} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>
                        <Link href={r.href} style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontWeight: '600' }}>{r.name}</Link>
                        <span style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>{r.rera}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Image src="https://www.nanded-city.in/aalaap/assets/img/img-aalaap-qr-code.png" alt="MahaRERA QR Code" width={48} height={48} style={{ background: '#fff', padding: '2px', borderRadius: '4px' }} />
                    <div>
                      <div style={{ color: '#fff', fontSize: '0.75rem', fontWeight: '600' }}>Verify Status</div>
                      <a href="https://maharera.mahaonline.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', fontSize: '0.7rem' }}>maharera.online</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: '32px' }} />

              {/* Legal Disclaimer Hardening */}
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem', lineHeight: '1.7', marginBottom: '24px' }}>
                Official Platform for Nanded City Township Residential Verticals. All registered projects are compliant as per the Real Estate (Regulation and Development) Act, 2016. All rendered images are for representational purposes only. Final specifications are as per the agreement for sale. Nanded City Pune Residences (nanded-city.in).
              </p>

              {/* Footer Bottom Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>© {new Date().getFullYear()} Nanded City Pune Residences. Built on trust.</span>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <Link href="/privacy-policy" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', textDecoration: 'none' }}>Privacy Policy</Link>
                  <Link href="/terms" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', textDecoration: 'none' }}>Terms of Use</Link>
                </div>
              </div>
            </div>
          </footer>
          <FloatingActionBar />
          <EnquiryModal />
        </ModalProvider>
      </body>
    </html>

  );
}
