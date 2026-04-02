"use client";

import { motion } from 'framer-motion';

export default function MarketIntelligence() {
  const stats = [
    { label: 'Avg. Appreciation', value: '12.5%', sub: 'Year-on-Year Growth' },
    { label: 'HNW Community Score', value: 'Elite', sub: 'CEOs, CXOs, Doctors & CAs' },
    { label: 'Infrastructure Score', value: '9.2/10', sub: 'Post-Flyover Completion' },
    { label: 'Rental Demand', value: '25% ⬆', sub: 'South Pune Professional Hub' }
  ];

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#f1f5f9' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-eyebrow">Market Intelligence</span>
          <h2 style={{ color: '#0f172a', fontSize: '2.4rem', marginTop: '10px' }}>Sinhgad Road Growth Index</h2>
          <p style={{ maxWidth: '750px', margin: '15px auto', color: '#64748b', fontSize: '1.1rem' }}>
            Authoritative metrics for the 2026 Pune real estate market. Data confirms that <strong>integrated townships like Nanded City</strong> are the #1 hedge against market volatility.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{
                backgroundColor: '#fff',
                padding: '40px 30px',
                borderRadius: '24px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.1)',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-gold)', marginBottom: '10px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
                {stat.label}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
            *Data aggregated from MahaRERA filings, infrastructure project completions, and regional transaction volumes (2024–2026).
          </p>
        </div>
      </div>
    </section>
  );
}
