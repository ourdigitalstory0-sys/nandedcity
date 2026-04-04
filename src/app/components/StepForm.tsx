"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '@/config/site';
import { gtmEvents } from './GtmEvents';

interface StepFormProps {
  theme?: 'light' | 'dark';
  initialProject?: string;
  context?: string;
  onSuccess?: (name: string) => void;
}

export default function StepForm({ 
  theme = 'light', 
  initialProject = '', 
  context = 'general',
  onSuccess 
}: StepFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [intent, setIntent] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: initialProject || ''
  });

  const isDark = theme === 'dark';

  const handleIntent = (value: string) => {
    setIntent(value);
    setStep(2);
    gtmEvents.modalOpen(`${context}_step_2`); // Reuse event for step tracking
  };

  const validatePhone = (p: string) => {
    const clean = p.replace(/\D/g, '');
    return clean.length >= 10;
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhone,
          project: formData.project || intent || initialProject || 'Nanded City General',
          source: `UnifiedStepForm - ${context.toUpperCase()}`,
          intent: intent
        }),
      });

      if (response.ok) {
        setStep(3);
        if (onSuccess) onSuccess(formData.name);
        gtmEvents.modalFormSubmit(context, formData.name);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err: any) {
      setError(`Error: ${err.message}. Please try again or call ${SITE_CONFIG.contact.phone}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles: React.CSSProperties = {
    padding: '14px 18px',
    borderRadius: '12px',
    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1.5px solid #e2e8f0',
    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
    color: isDark ? '#fff' : '#0f172a',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%'
  };

  const intentOptions = context === 'plot' 
    ? ['Below 1500 sq.ft.', '1500 - 2500 sq.ft.', 'Above 2500 sq.ft.', 'Immediate Purchase']
    : ['2 BHK Apartment', '3 BHK Apartment', 'Luxury 4 BHK', 'NA Bungalow Plots'];


  return (
    <div className={`step-form-container ${isDark ? 'dark' : 'light'}`}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <p style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#64748b', fontSize: '0.9rem', marginBottom: '8px' }}>
              Select your preference to unlock exclusive data:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {intentOptions.map(opt => (
                <button 
                  key={opt}
                  onClick={() => handleIntent(opt)}
                  className="step-btn"
                  style={{
                    padding: '16px 12px',
                    borderRadius: '12px',
                    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
                    color: isDark ? '#fff' : '#0f172a',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handleIntent('General Enquiry')}
              style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: '700', textDecoration: 'underline', marginTop: '8px', cursor: 'pointer' }}
            >
              Skip to General Enquiry
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                style={inputStyles}
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                required 
                style={inputStyles}
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />

              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', margin: '4px 0', textAlign: 'center' }}
                  >
                    ⚠️ {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-gold"
                style={{ width: '100%', padding: '16px', borderRadius: '12px', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'Verifying...' : 'Unlock Pricing & Brochure →'}
              </button>

              <button 
                type="button"
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: isDark ? 'rgba(255,255,255,0.4)' : '#64748b', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                ← Change Preference
              </button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ textAlign: 'center', padding: '20px 0' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
            <h3 style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1.5rem', marginBottom: '8px' }}>Request Received!</h3>
            <p style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>
              Our senior property advisor will contact you within 30 minutes with official pricing and e-brochures.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={SITE_CONFIG.contact.whatsapp} target="_blank" className="btn" style={{ backgroundColor: '#25D366', color: '#fff', borderRadius: '12px', padding: '14px', textDecoration: 'none', fontWeight: '700' }}>
                Join via WhatsApp
              </a>
              <button 
                onClick={() => window.location.reload()} 
                style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}
              >
                Submit another request
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .step-btn:hover {
          border-color: var(--accent-gold) !important;
          background-color: ${isDark ? 'rgba(201,168,76,0.1)' : 'rgba(201,168,76,0.05)'} !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
