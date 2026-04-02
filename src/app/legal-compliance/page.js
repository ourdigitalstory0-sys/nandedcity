import { clusters } from '../../data/clusters';
import ScrollReveal from '../components/ScrollReveal';

export const metadata = {
  title: "MahaRERA Compliance & Legal Records | Nanded City Pune",
  description: "Official legal compliance hub for Nanded City Developers Pune. Access all MahaRERA registration certificates and QR codes for all residential clusters.",
};

export default function LegalCompliance() {
  const tableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "MahaRERA Legal Compliance - Nanded City Pune",
    "description": "Comprehensive list of all MahaRERA registrations for Nanded City Developers."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tableSchema) }} />
      
      <section style={{ backgroundColor: '#0f172a', padding: '100px 0 60px', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ display: 'inline-block', backgroundColor: 'var(--accent-gold)', color: '#000', padding: '6px 14px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
            Transparency Guaranteed
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '24px', lineHeight: '1.2' }}>
            Legal Compliance Hub
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
            Nanded City Developers Pune strictly adheres to all regulatory standards. Below are the official MahaRERA Registration details and direct links to the Govt. of Maharashtra database for every ongoing cluster.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <ScrollReveal>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', backgroundColor: '#f1f5f9', padding: '20px 32px', borderBottom: '2px solid #e2e8f0' }}>
                <div style={{ fontWeight: '700', color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Project Name</div>
                <div style={{ fontWeight: '700', color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>MahaRERA Registration No.</div>
                <div style={{ fontWeight: '700', color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Official Link</div>
              </div>

              <div style={{ padding: '0 32px' }}>
                {clusters.filter(c => c.type === 'new' && c.rera).map((cluster, i) => (
                  <div key={cluster.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', padding: '24px 0', borderBottom: i !== clusters.length - 1 ? '1px solid #e2e8f0' : 'none', alignItems: 'center' }}>
                    
                    <div>
                      <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f172a', marginBottom: '4px' }}>{cluster.name}</strong>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{cluster.bhk}</span>
                    </div>

                    <div>
                      <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--primary-green)', fontSize: '1.1rem', backgroundColor: '#eef4f0', padding: '6px 14px', borderRadius: '4px' }}>
                        {cluster.rera}
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <a href={cluster.reraUrl} target="_blank" rel="noopener noreferrer" className="rera-link" style={{ display: 'inline-block', color: 'var(--accent-gold)', fontWeight: '600', fontSize: '0.95rem', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                        View Certificate ↗
                      </a>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>
      <style>{`
        .rera-link:hover {
          color: #b8972e !important;
        }
      `}</style>
    </>
  );
}
