"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnquiryModal, ENQUIRY_CONTEXTS } from '../context/ModalContext';
import { gtmEvents } from './GtmEvents';

export default function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);
  const { openEnquiry } = useEnquiryModal();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px, but only on mobile
      if (window.innerWidth < 768) {
        setIsVisible(window.scrollY > 500);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: 9999,
          padding: '12px 16px env(safe-area-inset-bottom)',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: '12px',
          boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.3)'
        }}
      >
        <a
          href="tel:+917996645777"
          onClick={() => gtmEvents.phoneCallClick('sticky_mobile_bar')}
          style={{
            flex: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <span>📞</span> Call
        </a>

        <a
          href="https://wa.me/917996645777?text=I%20am%20interested%20in%20Nanded%20City%20properties"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => gtmEvents.whatsappClick('sticky_mobile_bar')}
          style={{
            flex: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px',
            borderRadius: '12px',
            background: '#25D366',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
          }}
        >
          <span>📱</span> WhatsApp
        </a>

        <button
          onClick={() => openEnquiry('Sticky Mobile Bar', ENQUIRY_CONTEXTS.GENERAL)}
          style={{
            flex: '1.5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px',
            borderRadius: '12px',
            background: 'var(--accent-gold)',
            color: '#000',
            border: 'none',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
          }}
        >
          <span>✨</span> Book Visit
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
