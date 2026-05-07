"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Keyword {
  label: string;
  href: string;
}

const keywords: Keyword[] = [
  { label: "2 BHK in Nanded City", href: "/projects" },
  { label: "3 BHK Flats Sinhagad Road", href: "/projects" },
  { label: "NA Plots in Pune", href: "/projects" },
  { label: "Nanded City Price List 2026", href: "/blog/nanded-city-price-trends" },
  { label: "Best Township in South Pune", href: "/about-us" },
  { label: "Ready Possession Flats Pune", href: "/projects" },
  { label: "Resale in Nanded City", href: "/contact" },
  { label: "MahaRERA Registered Projects", href: "/legal-compliance" }
];

export default function SearchIntelligence() {
  return (
    <section style={{ backgroundColor: '#fff', padding: '60px 0', borderTop: '1px solid #f1f5f9' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#64748b', marginBottom: '16px' }}>
              Search Intelligence Hub
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {keywords.map((k, idx) => (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={k.href}
                    style={{ 
                      fontSize: '0.82rem', 
                      padding: '8px 16px', 
                      backgroundColor: '#f8fafc', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '100px',
                      color: '#475569',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    className="keyword-pill"
                  >
                    {k.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div style={{ padding: '24px', backgroundColor: '#f1f5f9', borderRadius: '16px', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>
            <p>
              <strong>Nanded City Pune Ecosystem:</strong> Our digital platform is optimized for the Pune real estate market, providing high-fidelity data on residential clusters like <strong>Asavari, Bageshree, Sargam, and Melody</strong>. We ensure all project information complies with <strong>MahaRERA</strong> standards, offering transparent pricing and floor plans for high-intent buyers looking for townships on <strong>Sinhagad Road</strong>.
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .keyword-pill:hover {
          background-color: var(--accent-gold) !important;
          color: #fff !important;
          border-color: var(--accent-gold) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(197, 168, 114, 0.2);
        }
      `}</style>
    </section>
  );
}
