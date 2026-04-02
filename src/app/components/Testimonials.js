"use client";

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Nanded City gave me exactly what I was looking for — a community of peers, not just neighbours. My family now lives in Sargam, and the township's school and hospital mean I never have to leave unless I choose to.",
    name: "Dr. Prashant Kulkarni",
    title: "Senior Oncologist, Sahyadri Hospital",
    avatar: "PK",
    property: "Sargam, 3 BHK"
  },
  {
    quote: "As a CXO, I value my time. Nanded City's internal infrastructure — from the fire station to the marketplace — means my family is completely secured. The Melody Bungalow Plot investment yielded 28% appreciation in 3 years.",
    name: "Vikram Iyer",
    title: "CXO, Global SaaS Firm",
    avatar: "VI",
    property: "Melody II, Branded Plot"
  },
  {
    quote: "The decision to buy into Nanded City was driven by data. The 12.5% annual appreciation and the consistent rental demand from IT professionals in Manikbaug make this Pune's most resilient real estate micro-market.",
    name: "CA Sunita Desai",
    title: "Chartered Accountant & Real Estate Advisor",
    avatar: "SD",
    property: "Aalaap-I, 2 BHK"
  }
];

export default function Testimonials() {
  return (
    <section style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.78rem', display: 'block', marginBottom: '12px' }}>
            Verified Resident Voices
          </span>
          <h2 style={{ fontSize: '2.4rem', color: '#0f172a' }}>Trusted by Pune's Elite</h2>
          <p style={{ color: '#64748b', marginTop: '12px', fontSize: '1.05rem' }}>
            Hear from the doctors, CXOs, and investors who call Nanded City home.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              style={{
                backgroundColor: '#fff',
                borderRadius: '24px',
                padding: '40px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04), 0 10px 20px -4px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              {/* Quote */}
              <div style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', lineHeight: 1, marginBottom: '-10px' }}>"</div>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.95rem', fontStyle: 'italic', flexGrow: 1 }}>
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#0f172a',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  flexShrink: 0
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{t.title}</div>
                  <div style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: '600', marginTop: '2px' }}>✓ {t.property}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
