"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: string;
  sub: string;
}

export default function MarketIntelligence() {
  const stats: Stat[] = [
    { label: 'Strategic Location', value: 'Prime', sub: 'Sinhagad Road Connectivity' },
    { label: 'Township Living', value: '700 Acres', sub: 'Integrated Green Ecosystem' },
    { label: 'Infrastructure', value: 'Growing', sub: 'Upcoming Metro & Flyovers' },
    { label: 'Community', value: 'Thriving', sub: 'Schools, IT Hubs & Healthcare' }
  ];

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#f1f5f9' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-eyebrow">Location Overview</span>
          <h2 style={{ color: '#0f172a', fontSize: '2.4rem', marginTop: '10px' }}>Sinhagad Road Micro-Market</h2>
          <p style={{ maxWidth: '750px', margin: '15px auto', color: '#64748b', fontSize: '1.1rem' }}>
            Nanded City offers a self-contained, secure ecosystem perfectly positioned near Pune&apos;s growing infrastructure networks.
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
            *Metrics represent general regional overview.
          </p>
        </div>
      </div>
    </section>
  );
}
