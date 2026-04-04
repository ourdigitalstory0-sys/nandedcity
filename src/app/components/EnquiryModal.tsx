"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnquiryModal, ENQUIRY_CONTEXTS, EnquiryContextType } from '../context/ModalContext';
import { gtmEvents } from './GtmEvents';

import { SITE_CONFIG } from '@/config/site';
import StepForm from './StepForm';

interface ModalCopy {
  eyebrow: string;
  headline: string;
  sub: string;
}

// Context-aware copy engine
const contextCopy: Record<EnquiryContextType, ModalCopy> = {
  [ENQUIRY_CONTEXTS.PLOT]: {
    eyebrow: 'Branded NA Bungalow Plots',
    headline: 'Access Exclusive Plot Pricing',
    sub: 'Register to receive private pricing, available plot inventory, and a curated site visit for Pune\'s most aspiring bungalow community.'
  },
  [ENQUIRY_CONTEXTS.APARTMENT]: {
    eyebrow: 'Premium Apartments',
    headline: 'Book Your Smart Home Tour',
    sub: 'Get first access to floor plans, MahaRERA compliance details, and current launch offers for ongoing apartment clusters.'
  },
  [ENQUIRY_CONTEXTS.TOWNSHIP]: {
    eyebrow: 'Township Lifestyle',
    headline: 'Explore the 700-Acre Ecosystem',
    sub: 'Speak with our township lifestyle specialist to understand the full 700-acre integrated community and what it means for your family.'
  },
  [ENQUIRY_CONTEXTS.GENERAL]: {
    eyebrow: 'Official Enquiry',
    headline: 'Secure Your Nanded City Asset',
    sub: 'Fill out the official enquiry form to unlock premium pricing, site visit schedules, and personalised project data from our senior advisors.'
  }
};

export default function EnquiryModal() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { isEnquiryOpen, selectedProject, enquiryContext, closeEnquiry } = useEnquiryModal();
  const copy = contextCopy[enquiryContext] || contextCopy[ENQUIRY_CONTEXTS.GENERAL];

  useEffect(() => {
    if (isEnquiryOpen) {
      gtmEvents.modalOpen(enquiryContext);
    }
  }, [isEnquiryOpen, enquiryContext]);

  // Reset success state when modal closes
  useEffect(() => {
    if (!isEnquiryOpen) {
      const timer = setTimeout(() => setIsSubmitted(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isEnquiryOpen]);

  return (
    <AnimatePresence>
      {isEnquiryOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnquiry}
            style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(10px)' }}
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            style={{ position: 'relative', width: '100%', maxWidth: '520px', backgroundColor: '#fff', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5)' }}
          >
            {/* Close button */}
            <button onClick={closeEnquiry} style={{ position: 'absolute', top: '18px', right: '18px', background: isSubmitted ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255,255,255,0.15)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', fontSize: '1rem', cursor: 'pointer', color: isSubmitted ? '#0f172a' : '#fff', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            
            {/* Header - Hidden on success to focus on the checkmark */}
            {!isSubmitted && (
              <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px 40px 32px', color: '#fff' }}>
                <span style={{ color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.72rem', marginBottom: '10px', display: 'block' }}>
                  {copy.eyebrow}
                </span>
                <h2 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '10px', lineHeight: '1.2' }}>{copy.headline}</h2>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: '1.6' }}>{copy.sub}</p>
              </div>
            )}

            {/* Step Engine */}
            <div style={{ padding: isSubmitted ? '60px 40px' : '36px 40px' }}>
              <StepForm 
                theme="light"
                context={enquiryContext}
                initialProject={selectedProject}
                onSuccess={() => setIsSubmitted(true)}
              />
              
              {!isSubmitted && (
                <div style={{ display: 'flex', gap: '16px', paddingTop: '24px', opacity: 0.6 }}>
                   <div style={{ flex: 1, fontSize: '0.7rem', color: '#64748b', fontWeight: '500' }}>
                     ✅ Official Partner Access
                   </div>
                   <div style={{ flex: 1, fontSize: '0.7rem', color: '#64748b', fontWeight: '500' }}>
                     ✅ Verified MahaRERA Data
                   </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
