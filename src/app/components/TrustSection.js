"use client";

import { motion } from 'framer-motion';

const pillars = [
  {
    icon: '🏥',
    title: 'Township Hospital',
    desc: 'Full-service medical facility within the campus for residents.',
    stat: '24/7 Care'
  },
  {
    icon: '🎓',
    title: 'Premium Schools',
    desc: 'International and CBSE schools within walking distance inside the township.',
    stat: '5 Institutions'
  },
  {
    icon: '🔒',
    title: 'Private Security',
    desc: 'Dedicated township police outpost and smart CCTV infrastructure.',
    stat: 'Zero Incidents'
  },
  {
    icon: '🧯',
    title: 'Fire Station',
    desc: 'One of the only residential townships in Pune with an internal fire station.',
    stat: 'Fully Equipped'
  },
  {
    icon: '🌳',
    title: '200+ Acres Green',
    desc: 'Twice the green lung of Pune\'s most celebrated urban parks.',
    stat: '200+ Acres'
  },
  {
    icon: '🛒',
    title: 'Destination Center',
    desc: 'Retail, café, and lifestyle hub integrated within the township boundary.',
    stat: '50+ Brands'
  }
];

export default function TrustSection() {
  return (
    <section id="township" style={{ padding: '100px 0', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', overflow: 'hidden', position: 'relative' }}>
      {/* Background Glow Orb */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <span style={{ color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.78rem', display: 'block', marginBottom: '14px' }}>
            Self-Reliant 700-Acre Ecosystem
          </span>
          <h2 style={{ color: '#f8fafc', fontSize: '2.6rem', lineHeight: '1.2', maxWidth: '700px', margin: '0 auto 20px' }}>
            A Complete City Within the City
          </h2>
          <p style={{ color: ' rgba(248,250,252,0.6)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            No other township in Pune offers this level of self-contained luxury. Nanded City is not just a home — it is an institution.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '32px',
                cursor: 'default',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: '2.4rem', marginBottom: '18px' }}>{pillar.icon}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ color: '#f1f5f9', fontSize: '1.1rem', fontWeight: '700' }}>{pillar.title}</h3>
                <span style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: 'var(--accent-gold)', fontSize: '0.7rem', fontWeight: '700', padding: '4px 10px', borderRadius: '100px', whiteSpace: 'nowrap' }}>
                  {pillar.stat}
                </span>
              </div>
              <p style={{ color: 'rgba(248,250,252,0.55)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Authority Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '60px', padding: '30px 40px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '16px', display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
        >
          {[{ v: '700+', l: 'Acres' }, { v: '15,000+', l: 'Families' }, { v: '25+ Yrs', l: 'Legacy' }, { v: '12+', l: 'Clusters' }, { v: 'AAA', l: 'Developer Rating' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-gold)' }}>{s.v}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(248,250,252,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
