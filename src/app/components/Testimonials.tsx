"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  property: string;
}

const testimonials: Testimonial[] = [
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
    <section style={{ padding: '120px 0', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span style={{ color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.78rem', display: 'block', marginBottom: '16px' }}>
            Verified Resident Voices
          </span>
          <h2 style={{ fontSize: '2.8rem', color: '#0f172a', fontWeight: '800' }}>Trusted by Pune&apos;s Elite</h2>
          <p style={{ color: '#64748b', marginTop: '16px', fontSize: '1.1rem', maxWidth: '600px', margin: '16px auto 0' }}>
            Hear from the doctors, CXOs, and investors who call Nanded City home and have witnessed the township&apos;s legacy.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: '#fff',
                borderRadius: '32px',
                padding: '48px',
                border: '1px solid rgba(15, 23, 42, 0.04)',
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                position: 'relative'
              }}
            >
              {/* Verified Badge */}
              <div style={{ position: 'absolute', top: '30px', right: '30px', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(16, 185, 129, 0.08)', padding: '6px 12px', borderRadius: '100px' }}>
                <span style={{ fontSize: '0.8rem', color: '#10b981' }}>✓</span>
                <span style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#10b981' }}>Verified Resident</span>
              </div>
              
              <p style={{ 
                color: '#334155', 
                lineHeight: '1.9', 
                fontSize: '1.05rem', 
                fontStyle: 'normal', 
                fontWeight: '500',
                flexGrow: 1,
                position: 'relative',
                zIndex: 1,
                letterSpacing: '-0.01em'
              }}>
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingTop: '32px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '100px',
                  backgroundColor: '#f8fafc',
                  border: '2px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(197, 168, 114, 0.15)'
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '1.1rem', marginBottom: '2px' }}>{t.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '500', marginBottom: '4px' }}>{t.title}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold)', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <span style={{ fontSize: '1rem' }}>📍</span> {t.property}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
