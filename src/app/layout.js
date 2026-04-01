import { Outfit } from "next/font/google";
import Link from 'next/link';
import Image from 'next/image';
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata = {
  title: {
    default: "Nanded City Pune | Premium Luxury Residential Flats",
    template: "%s | Nanded City Pune",
  },
  description: "Explore premium 2, 2.5 & 3 BHK luxury residential apartments in Nanded City, Sinhagad Road, Pune. MahaRERA compliant eco-friendly township with world-class amenities.",
  keywords: "Nanded City Pune, Luxury Flats Pune, Sinhagad Road apartments, MahaRERA compliant homes, 2BHK Nanded City, 3BHK Nanded City, Melody Nanded City, Aalaap, Saajgiri",
  metadataBase: new URL("https://nandedcitypune.com"),
  verification: {
    google: "pending-google-verification-id",
    yandex: "pending-yandex-verification-id",
    other: {
      me: ['info@nandedcitypune.com', 'https://nandedcitypune.com'],
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
    url: "https://nandedcitypune.com",
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
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <header id="site-header" role="banner">
          <div className="container header-content">
            <div className="logo">
              <Link href="/" aria-label="Nanded City Home" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Image 
                  src="https://nandedcitypune.com/wp-content/themes/nandedcity/images/nc-logo.png" 
                  alt="Nanded City Pune Official Logo" 
                  width={150}
                  height={45}
                  style={{ objectFit: 'contain' }}
                />
                <span className="logo-sub" style={{ marginTop: '4px' }}>Sinhagad Road · Pune</span>
              </Link>
            </div>
            <nav className="nav-links" aria-label="Main Navigation">
              <Link href="/#ongoing">Ongoing Projects</Link>
              <Link href="/#completed">Completed Projects</Link>
              <Link href="/#contact" className="nav-cta">Enquire Now</Link>
            </nav>
          </div>
        </header>

        <main id="main-content" role="main">{children}</main>

        <footer id="site-footer" role="contentinfo">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-col">
                <Image 
                  src="https://nandedcitypune.com/wp-content/themes/nandedcity/images/nc-logo.png" 
                  alt="Nanded City Pune Official Logo Footer" 
                  width={150}
                  height={45}
                  style={{ objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.9)', marginBottom: '16px' }}
                />
                <p className="footer-tagline">Premium residential living on Sinhagad Road, Pune. Where nature meets world-class urban design.</p>
              </div>
              <div className="footer-col">
                <h3>Contact Us</h3>
                <p>Nanded, Sinhagad Road,<br />Pune, Maharashtra – 411041</p>
                <p style={{ marginTop: '8px' }}><a href="tel:+917996645777" style={{ color: 'rgba(255,255,255,0.8)' }}>📞 +91 7996645777</a></p>
                <p><a href="mailto:info@nandedcitypune.com" style={{ color: 'rgba(255,255,255,0.8)' }}>✉️ info@nandedcitypune.com</a></p>
              </div>
              <div className="footer-col">
                <h3>MahaRERA Compliance</h3>
                <ul>
                  <li><Link href="/cluster/melody-1">Melody I: P52100051948</Link></li>
                  <li><Link href="/cluster/melody-2">Melody II: P52100051867</Link></li>
                  <li><Link href="/cluster/aalaap-1">Aalaap-I: P52100055134</Link></li>
                  <li><Link href="/cluster/saajgiri">Saajgiri: PR1260002501621</Link></li>
                  <li><Link href="/cluster/rhythm-1">Rhythm: P52100028606</Link></li>
                </ul>
                <div style={{ marginTop: '16px', display: 'inline-flex', alignContent: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>
                  <Image 
                    src="https://nandedcitypune.com/aalaap/assets/img/img-aalaap-qr-code.png" 
                    alt="Corporate MahaRERA Verification QR" 
                    width={60} 
                    height={60} 
                    style={{ background: '#fff', padding: '2px', borderRadius: '4px' }} 
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#fff' }}>Scan to Verify</span>
                    <a href="https://maharera.mahaonline.gov.in/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', color: 'var(--accent-gold)' }}>
                      maharera.mahaonline.gov.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-disclaimer">
              The information provided on this website is for general information purposes only. All images and renders shown are for representational purposes.
              Prices mentioned are subject to availability and may change without prior notice. MahaRERA registered projects are legally compliant as per the
              Real Estate (Regulation and Development) Act, 2016.
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Nanded City Developers. All rights reserved.</span>
              <div className="footer-links">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms">Terms of Use</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
