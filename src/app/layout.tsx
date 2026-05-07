import React from "react";
import { Metadata } from "next";
import { Outfit } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import Link from 'next/link';
import Image from 'next/image';
import TransitionFrame from './components/TransitionFrame';
import DynamicHeader from './components/DynamicHeader';
import FloatingActionBar from './components/FloatingActionBar';
import StickyMobileCta from './components/StickyMobileCta';
import EnquiryModal from './components/EnquiryModal';
import { ModalProvider } from './context/ModalContext';
import { Organization, WebSite, WithContext } from 'schema-dts';
import { SITE_CONFIG } from '@/config/site';

import "./globals.css";


const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Premium Luxury Residential Flats`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: "Nanded City Pune, buy flat in Nanded City Pune, 1 BHK, 2 BHK, 2.5 BHK, 3 BHK, Nanded City Sinhagad Road, Nanded City township Pune, Nanded City flats for sale, Nanded City apartments, Nanded City property investment, Nanded City ready possession flats, Nanded City new launch, Nanded City resale flats, Nanded City price list, Nanded City brochure, Nanded City master plan, Nanded City amenities, Nanded City reviews, Nanded City location advantage, best township near Sinhagad Road Pune, gated community near Khadakwasla Pune",
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  verification: {
    google: "EO-ezSz-FlhAk-eKdIWOB9xTRFXojS-rHXyMVZPAyQs",
    yandex: "pending-yandex-verification-id",
    other: {
      me: [SITE_CONFIG.contact.email, SITE_CONFIG.baseUrl],
    },
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Premium Residential Flats`,
    images: [SITE_CONFIG.brand.ogImage],
  },
  openGraph: {
    title: `${SITE_CONFIG.name} | Built on Trust`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.baseUrl,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.brand.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
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
    canonical: SITE_CONFIG.baseUrl,
    languages: {
      'en-IN': SITE_CONFIG.baseUrl,
      'mr-IN': `${SITE_CONFIG.baseUrl}/mr/2-bhk-flats`, // High-intent Marathi landing
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmEnabled = GTM_ID !== 'GTM-XXXXXXX';
  const organizationSchema: any = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_CONFIG.baseUrl}/#organization`,
    "name": SITE_CONFIG.brand.developerName,
    "alternateName": SITE_CONFIG.name,
    "url": SITE_CONFIG.baseUrl,
    "logo": `${SITE_CONFIG.baseUrl}${SITE_CONFIG.brand.logo}`, 
    "image": SITE_CONFIG.brand.ogImage,
    "description": SITE_CONFIG.brand.organizationName + ": Authorized Partner for Nanded City Pune. 700+ acres of self-reliant premium township on Sinhagad Road.",
    "telephone": SITE_CONFIG.contact.phoneNumeric,
    "email": SITE_CONFIG.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nanded City Township, Sinhagad Road",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411041",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.4612,
      "longitude": 73.8015
    },
    "hasMap": "https://maps.app.goo.gl/NandedCityPune",
    "priceRange": "₹45L - ₹2.5Cr",
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
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram
    ],
    "knowsAbout": [
      "Real Estate Investment in Pune",
      "Luxury Apartments Sinhagad Road",
      "NA Bungalow Plots Pune",
      "MahaRERA Registered Projects",
      "Township Living Pune",
      "1 BHK, 2 BHK, 2.5 BHK, 3 BHK Flats Pune",
      "MHADA Janaranjani Nanded City",
      "Ready Possession Flats Pune"
    ]
  };

  // WebSite Schema with SearchAction — Sitelinks Search Box eligibility
  const websiteSchema: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.baseUrl}/#website`,
    "name": "Nanded City Pune Residences",
    "url": SITE_CONFIG.baseUrl,
    "description": "Official residential platform for Nanded City Township, Sinhagad Road, Pune — premium asavari, bageshree, sargam apartments and branded NA bungalow plots.",
    "publisher": {
      "@id": `${SITE_CONFIG.baseUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_CONFIG.baseUrl}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-IN"
  };

  const aboutSchema: any = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://www.nanded-city.in/about-us/#webpage",
    "url": "https://www.nanded-city.in/about-us",
    "name": "About Nanded City Developers",
    "mainEntity": { "@id": "https://www.nanded-city.in/#organization" }
  };

  const contactSchema: any = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://www.nanded-city.in/#contact-page",
    "url": "https://www.nanded-city.in/#contact",
    "name": "Contact Nanded City Sales Team",
    "mainEntity": { "@id": "https://www.nanded-city.in/#organization" }
  };

  return (
    <html lang="en">
      {gtmEnabled && <GoogleTagManager gtmId={GTM_ID} />}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema, aboutSchema, contactSchema]) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.nanded-city.in" />
        <link rel="manifest" href="/manifest.json" />
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
                    src="/nc-logo.png" 
                    alt="Nanded City Pune Official Logo" 
                    width={180} height={50}
                    style={{ objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.9)', marginBottom: '20px' }}
                  />
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: '1.7', maxWidth: '240px', marginBottom: '24px' }}>
                    Pune&apos;s most aspiring township on Sinhagad Road near Khadakwasla dam. 700 Acres of curated, self-reliant luxury living near Anandnagar and Dhayari.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href={`tel:${SITE_CONFIG.contact.phoneNumeric}`} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none' }}>📞 {SITE_CONFIG.contact.phone}</a>
                    <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none' }}>✉️ {SITE_CONFIG.contact.email}</a>
                    <a href={SITE_CONFIG.contact.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '0.85rem', textDecoration: 'none' }}>📱 {SITE_CONFIG.contact.whatsappPrompt}</a>
                  </div>

                </div>

                {/* Column 2: Residential Projects Hub */}
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Nanded City Gambit</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { name: 'Asawari — Resale Flats', href: '/cluster/asawari' },
                      { name: 'Sargam — High Rise Towers', href: '/cluster/sargam' },
                      { name: 'Janaranjani — MHADA Flats', href: '/cluster/janaranjani' },
                      { name: 'Mangal Bhairav — 1 BHK Budget', href: '/cluster/mangal-bhairav' },
                      { name: 'Aalaap — New Launch 2.5 BHK', href: '/cluster/aalaap-1' },
                      { name: 'Saajgiri — Luxury 3 BHK', href: '/cluster/saajgiri' },
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
                      { name: 'Bungalow Plots investment Pune', href: '/blog/branded-na-bungalow-plots-nanded-city-community' },
                      { name: 'Nanded City Price List 2026', href: '/blog/nanded-city-pune-master-plan-price-list-guide' },
                      { name: 'ROI flats Sinhagad Road', href: '/blog/nanded-city-investment-roi-doctors-professionals' },
                      { name: 'Low cost flats near Nanded City', href: '/blog/affordable-homes-janaranjani-mhada-mangal-bhairav' },
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

                {/* Column 4: Location Advantage Hub */}
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Hyperlocal Advantage</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {[
                      { name: 'Nanded City Public School', href: '/blog/nanded-city-township-amenities-lifestyle-guide' },
                      { name: 'Destination Centre Shopping', href: '/blog/nanded-city-township-amenities-lifestyle-guide' },
                      { name: 'Nanded City Bus Stop', href: '/blog/sinhgad-road-property-price-trends-2026' },
                      { name: 'Khadakwasla Dam Proximity', href: '/blog/sinhgad-road-property-price-trends-2026' },
                    ].map(r => (
                      <li key={r.name} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>
                        <Link href={r.href} style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontWeight: '600' }}>{r.name}</Link>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Image src="https://www.nanded-city.in/aalaap/assets/img/img-aalaap-qr-code.png" alt="MahaRERA QR Code" width={48} height={48} style={{ background: '#fff', padding: '2px', borderRadius: '4px' }} />
                    <div>
                      <div style={{ color: '#fff', fontSize: '0.75rem', fontWeight: '600' }}>Official Verification</div>
                      <a href="https://maharera.mahaonline.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', fontSize: '0.7rem' }}>maharera.online</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: '32px' }} />

              {/* Highly Hardened Strategy Disclaimer */}
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem', lineHeight: '1.7', marginBottom: '16px' }}>
                The definitive Nanded City Pune Residential Platform. Explore premium 1 BHK, 2 BHK, 2.5 BHK, and 3 BHK flats near Sinhagad Road Pune. All residential clusters — including Asawari, Sargam, and Saajgiri — are MahaRERA compliant. Located near Nanded City Public School, Destination Centre, and Khadakwasla, Nanded City Township, Sinhagad Road, Pune – 411041.
              </p>

              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', lineHeight: '1.8', margin: 0 }}>
                  <strong style={{ color: 'var(--accent-gold)' }}>Disclaimer:</strong> {SITE_CONFIG.brand.organizationName} ({SITE_CONFIG.contact.phone}) is an <strong>Authorized Marketing & Sales Partner</strong> for Nanded City Pune (the Township). All information, properties, prices, and floor plans featured on this independent portal are for representational and informational purposes only and are subject to change without notice. This platform does not constitute an official offer or guarantee from Nanded City Developers. We facilitate institutional advisory and site-visit arrangements for prospective homebuyers. All trademarks and logos belong to their respective owners.
                </p>
              </div>


              {/* Footer Bottom Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>© {new Date().getFullYear()} Nanded City Pune. Built on trust.</span>
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
