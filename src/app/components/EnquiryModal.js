"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEnquiryModal, ENQUIRY_CONTEXTS } from '../context/ModalContext';
import { clusters } from '../../data/clusters';
import { gtmEvents } from './GtmEvents';
import { useEffect } from 'react';

// Context-aware copy engine
const contextCopy = {
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
  const { isEnquiryOpen, selectedProject, enquiryContext, closeEnquiry } = useEnquiryModal();
  const ongoingClusters = clusters.filter(c => c.type === 'new');
  const copy = contextCopy[enquiryContext] || contextCopy[ENQUIRY_CONTEXTS.GENERAL];

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameInput = e.target[0].value;
    gtmEvents.modalFormSubmit(enquiryContext, nameInput);
    alert("Thank you! Our senior advisor will contact you within 30 minutes with personalised project data.");
    closeEnquiry();
  };

  useEffect(() => {
    if (isEnquiryOpen) {
      gtmEvents.modalOpen(enquiryContext);
    }
  }, [isEnquiryOpen, enquiryContext]);

  // Pre-select plot options if context is plot
  const defaultSelect = selectedProject || (enquiryContext === ENQUIRY_CONTEXTS.PLOT ? 'plots' : '');

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
            <button onClick={closeEnquiry} style={{ position: 'absolute', top: '18px', right: '18px', background: 'rgba(255,255,255,0.15)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', fontSize: '1rem', cursor: 'pointer', color: '#fff', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px 40px 32px', color: '#fff' }}>
              <span style={{ color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.72rem', marginBottom: '10px', display: 'block' }}>
                {copy.eyebrow}
              </span>
              <h2 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '10px', lineHeight: '1.2' }}>{copy.headline}</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: '1.6' }}>{copy.sub}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '36px 40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  style={{ padding: '14px 18px', borderRadius: '12px', border: '1.5px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
                <input 
                  type="tel" 
                  placeholder="Mobile Number" 
                  required 
                  style={{ padding: '14px 18px', borderRadius: '12px', border: '1.5px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '0.95rem', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />

                <select 
                  defaultValue={defaultSelect}
                  style={{ padding: '14px 18px', borderRadius: '12px', border: '1.5px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '0.95rem', outline: 'none', width: '100%', color: '#475569' }}
                >
                  <option value="" disabled>Select Project of Interest</option>
                  {ongoingClusters.map(c => (
                    <option key={c.id} value={c.id}>{c.name} – {c.bhk}</option>
                  ))}
                  <option value="plots">Melody Branded NA Bungalow Plots</option>
                  <option value="township">Township Commercial / Destination</option>
                </select>

                <button type="submit" style={{ padding: '16px', backgroundColor: 'var(--accent-gold)', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 14px rgba(201,168,76,0.4)' }}>
                  Submit Enquiry →
                </button>

                <div style={{ display: 'flex', gap: '16px', paddingTop: '4px' }}>
                  <a href="https://wa.me/917996645777" target="_blank" rel="noopener noreferrer"
                    onClick={() => gtmEvents.whatsappClick('modal')}
                    style={{ flex: 1, padding: '12px', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem', border: '1px solid #bbf7d0' }}>
                    📱 WhatsApp Expert
                  </a>
                  <a href="tel:+917996645777"
                    onClick={() => gtmEvents.phoneCallClick('modal')}
                    style={{ flex: 1, padding: '12px', backgroundColor: '#f8fafc', color: '#475569', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem', border: '1px solid #e2e8f0' }}>
                    📞 Call Now
                  </a>
                </div>

                <p style={{ fontSize: '0.68rem', color: '#94a3b8', textAlign: 'center', lineHeight: '1.5' }}>
                  MahaRERA: P52100055134 · P52100051948 · P52100051867 · Fully Compliant
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
