import Image from 'next/image';
import Link from 'next/link';
import { clusters } from '../data/clusters';
import ContactForm from './components/ContactForm';
import ReraQrCode from './components/ReraQrCode';
import ScrollReveal from './components/ScrollReveal';
import ParallaxHero from './components/ParallaxHero';

export const metadata = {
  alternates: {
    canonical: 'https://nandedcitypune.com',
  },
};

export default function Home() {
  const ongoingClusters = clusters.filter(c => c.type === 'new');
  const completedClusters = clusters.filter(c => c.type === 'completed');

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Nanded City Developers",
      "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "@id": "https://nandedcitypune.com",
      "url": "https://nandedcitypune.com",
      "telephone": "+917996645777",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nanded, Sinhagad Road",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411041",
        "addressCountry": "IN"
      },
      "description": "Nanded City developers offer luxury 2, 2.5 & 3 BHK residential apartments in Sinhagad Road, Pune.",
      "makesOffer": clusters.filter(c => c.type === 'new').map(c => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Residence",
          "name": c.name,
          "description": c.description,
          "numberOfRooms": c.bhk,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
          }
        },
        "price": c.price,
        "priceCurrency": "INR",
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Nanded City Pune",
      "url": "https://nandedcitypune.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://nandedcitypune.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://nandedcitypune.com"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Nanded City Developers Pune",
      "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "telephone": "+917996645777",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nanded, Sinhagad Road",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411041",
        "addressCountry": "IN"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      "xpathtypes": ["cssSelector"],
      "cssSelector": [".hero-seo-text", ".speakable-title"]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <ParallaxHero bgImage="https://nandedcitypune.com/wp-content/uploads/2026/02/saajgiri-ncp-banner-img-01.webp">
        <span className="badge badge-gold">Sinhagad Road · Pune</span>
        <h1 className="speakable-title">Welcome to <span>Nanded City Pune</span></h1>
        <p className="hero-seo-text">
          Discover <strong>premium 2 & 3 BHK luxury flats in Nanded City Pune</strong>. An eco-friendly township on <strong>Sinhagad Road</strong> offering MahaRERA registered projects with <em>world-class development</em> across 400+ acres.
        </p>
        <div className="hero-actions">
          <a href="#ongoing" className="btn btn-gold">Explore Projects</a>
          <a href="#contact" className="btn btn-outline">Contact Us</a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><strong>400+</strong><span>Acres</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><strong>15k+</strong><span>Happy Families</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><strong>12+</strong><span>Clusters</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><strong>25+ Yrs</strong><span>Of Trust</span></div>
        </div>
      </ParallaxHero>

      {/* Ongoing Projects */}
      <section id="ongoing" className="section-padding" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <ScrollReveal className="section-header">
            <span className="section-eyebrow">MahaRERA Verified</span>
            <h2>Ongoing Projects</h2>
            <p>Discover our under-construction towers — fully RERA registered and built to deliver on time.</p>
          </ScrollReveal>

          <div className="grid-cols-2">
            {ongoingClusters.map((cluster, index) => (
              <ScrollReveal key={cluster.id} delay={index * 0.1}>
                <article className="cluster-card">
                <a href={`/cluster/${cluster.id}`} className="card-image-link">
                  <div className="card-image">
                    <Image src={cluster.image} alt={`${cluster.name} - ${cluster.bhk} apartments in Nanded City`} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                    <div className="card-badge-wrap">
                      <span className="badge badge-green">{cluster.bhk}</span>
                    </div>
                    <div className="card-price-tag">{cluster.price}</div>
                  </div>
                </a>
                <div className="card-content">
                  <h3 className="card-title">
                    <a href={`/cluster/${cluster.id}`}>{cluster.name}</a>
                  </h3>
                  <div className="card-meta">
                    <span className="status-dot ongoing" />
                    <span>{cluster.status}</span>
                    <span style={{ marginLeft: 'auto' }}>📐 {cluster.area}</span>
                  </div>
                  <p className="card-desc">{cluster.description}</p>

                  <div className="card-highlights">
                    {cluster.highlights.slice(0, 3).map(h => (
                      <span key={h} className="highlight-chip">{h}</span>
                    ))}
                  </div>

                  <div className="rera-footer" style={{ padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <ReraQrCode reraUrl={cluster.reraUrl} reraNumber={cluster.rera} qrImage={cluster.qrImage} />
                    <a href={`/cluster/${cluster.id}`} className="btn-details">
                      View Details →
                    </a>
                  </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nanded City */}
      <section className="section-padding why-section">
        <div className="container">
          <ScrollReveal className="section-header" style={{ color: '#fff' }}>
            <span className="section-eyebrow" style={{ color: 'var(--accent-gold)' }}>Why Choose Us</span>
            <h2 style={{ color: '#fff' }}>Built on Trust. Delivered with Excellence.</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)' }}>
              Nanded City is not just a development — it&apos;s a self-sustaining township that has set the gold standard for residential living on Sinhagad Road.
            </p>
          </ScrollReveal>
          <div className="why-grid">
            {[
              { icon: '🏆', title: '25+ Years of Excellence', body: 'A legacy developer trusted by 15,000+ families across Pune for timely delivery and superior construction quality.' },
              { icon: '🌿', title: 'Eco-Friendly Township', body: '400+ acres with 70% open spaces, rainwater harvesting, solar energy, and a dedicated green belt.' },
              { icon: '📜', title: 'MahaRERA Compliant', body: 'Every active project carries a valid MahaRERA registration number, ensuring full legal transparency and buyer protection.' },
              { icon: '🎓', title: 'World-Class Infrastructure', body: 'Schools, hospitals, shopping centers, and recreational facilities are all within the township — a truly walkable community.' },
            ].map((w, idx) => (
              <ScrollReveal key={w.title} delay={idx * 0.15}>
                <div className="why-card">
                  <span className="why-icon">{w.icon}</span>
                  <h3 className="why-title">{w.title}</h3>
                  <p className="why-body">{w.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      <section id="completed" className="section-padding" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <ScrollReveal className="section-header">
            <span className="section-eyebrow">A Legacy of Delivery</span>
            <h2>Completed Projects</h2>
            <p>Thriving communities, fully inhabited. Our completed clusters stand as a testament to our quality and commitment.</p>
          </ScrollReveal>

          <div className="grid-cols-3">
            {completedClusters.map((cluster, index) => (
              <ScrollReveal key={cluster.id} delay={index * 0.1}>
                <article className="cluster-card cluster-card-sm">
                <a href={`/cluster/${cluster.id}`} className="card-image-link">
                  <div className="card-image card-image-sm">
                    <Image src={cluster.image} alt={`${cluster.name} completed residential project Nanded City`} fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                    <div className="card-badge-wrap">
                      <span className="badge" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>Ready to Move</span>
                    </div>
                  </div>
                </a>
                <div className="card-content">
                  <h3 className="card-title card-title-sm">
                    <a href={`/cluster/${cluster.id}`}>{cluster.name}</a>
                  </h3>
                  <div className="card-meta">
                    <span className="status-dot completed" />
                    <span style={{ color: 'var(--primary-green)', fontWeight: '600' }}>{cluster.status}</span>
                  </div>
                  <p className="card-desc" style={{ fontSize: '0.875rem' }}>{cluster.description}</p>
                  <a href={`/cluster/${cluster.id}`} className="btn-details" style={{ marginTop: '12px', display: 'inline-block' }}>
                    View Details →
                  </a>
                </div>
              </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Compass Grid */}
      <section className="section-padding" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '30px', textAlign: 'left' }}>
            <span className="section-eyebrow">Top Real Estate Searches in Pune</span>
            <h2 style={{ fontSize: '1.75rem', color: '#111827' }}>Explore Nanded City Clusters</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#1e293b' }}>Luxury 3 BHK Flats</h3>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6' }}>
                Looking for <strong>spacious 3 BHK apartments in Pune</strong> with panoramic views? 
                Explore the premium high-rise residences at <Link href="/cluster/saajgiri" style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>Saajgiri</Link>.
              </p>
            </div>
            <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#1e293b' }}>Premium Bungalow Plots</h3>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6' }}>
                Invest in <strong>premium bungalow plots near Hinjewadi IT Park routes</strong> and Sinhagad Road. 
                Secure your legacy with <Link href="/cluster/rhythm-1" style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>Rhythm</Link> today.
              </p>
            </div>
            <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#1e293b' }}>Affordable 2 BHK Homes</h3>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6' }}>
                Discover vibrant community living with <strong>MahaRERA registered 2 BHK flats in Pune</strong>. 
                Experience tranquility and modern design at <Link href="/cluster/aalaap-1" style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>Aalaap-I</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding contact-section">
        <div className="container contact-inner">
          <ScrollReveal className="contact-info">
            <span className="section-eyebrow" style={{ color: 'var(--accent-gold)' }}>Get in Touch</span>
            <h2 style={{ color: '#fff' }}>Talk to Our Team</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <ReraQrCode 
                reraUrl="https://maharera.mahaonline.gov.in/" 
                reraNumber="MahaRERA Registered Projects" 
                qrImage="https://nandedcitypune.com/aalaap/assets/img/img-aalaap-qr-code.png" 
              />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
              Our residential experts are ready to help you find the perfect home in Nanded City. Schedule a free site visit today.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Nanded, Sinhagad Road, Pune – 411041</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:+917996645777" style={{ color: 'rgba(255,255,255,0.9)' }}>+91 7996645777</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <a href="mailto:info@nandedcitypune.com" style={{ color: 'rgba(255,255,255,0.9)' }}>info@nandedcitypune.com</a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <ContactForm ongoingClusters={ongoingClusters} />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
