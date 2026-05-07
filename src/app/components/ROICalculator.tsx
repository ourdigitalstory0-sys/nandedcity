"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ROICalculator() {
  const [investment, setInvestment] = useState(7500000);
  const [years, setYears] = useState(5);
  const [growth, setGrowth] = useState(10); // 10% avg for Nanded City
  const [rental, setRental] = useState(3.5); // 3.5% avg yield

  const [futureValue, setFutureValue] = useState(0);
  const [totalRental, setTotalRental] = useState(0);
  const [totalRoi, setTotalRoi] = useState(0);

  useEffect(() => {
    const fv = investment * Math.pow(1 + growth / 100, years);
    const rent = investment * (rental / 100) * years;
    setFutureValue(fv);
    setTotalRental(rent);
    setTotalRoi(((fv + rent - investment) / investment) * 100);
  }, [investment, years, growth, rental]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(val);

  return (
    <section style={{ padding: '100px 0', backgroundColor: '#0f172a', color: '#fff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
          
          {/* Left: Inputs */}
          <div>
            <span className="section-eyebrow" style={{ color: 'var(--accent-gold)' }}>Financial Intelligence</span>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '24px' }}>Township ROI Analytics</h2>
            <p style={{ color: '#94a3b8', marginBottom: '40px' }}>
              Integrated townships in Pune consistently outperform standalone projects. Use our proprietary 2026 model to estimate your wealth growth in Nanded City.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1' }}>Investment Value</label>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: '700' }}>{formatCurrency(investment)}</span>
                </div>
                <input 
                  type="range" min="3000000" max="30000000" step="500000"
                  value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>Horizon (Years)</label>
                  <select 
                    value={years} onChange={(e) => setYears(Number(e.target.value))}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                  >
                    {[3, 5, 7, 10, 15].map(y => <option key={y} value={y}>{y} Years</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>Annual Growth (%)</label>
                  <input 
                    type="number" value={growth} onChange={(e) => setGrowth(Number(e.target.value))}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              padding: '50px',
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '32px',
              border: '1px solid rgba(197, 168, 114, 0.2)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(197, 168, 114, 0.1) 0%, transparent 70%)' }} />
            
            <div style={{ marginBottom: '40px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px' }}>Projected Appreciation</span>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-gold)', marginTop: '8px' }}>{formatCurrency(futureValue)}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cumulative Rental</span>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '4px' }}>{formatCurrency(totalRental)}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total ROI</span>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981', marginTop: '4px' }}>+{totalRoi.toFixed(1)}%</div>
              </div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <button 
                style={{
                  width: '100%',
                  padding: '18px',
                  backgroundColor: 'var(--accent-gold)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Download Detailed Investment Report
              </button>
            </div>

            <p style={{ marginTop: '24px', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
              *Projections based on historical 2015-2026 Nanded City appreciation data.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
