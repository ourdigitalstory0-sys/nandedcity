"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useEnquiryModal, ENQUIRY_CONTEXTS, EnquiryContextType } from '../context/ModalContext';
import { gtmEvents } from './GtmEvents';

interface Action {
  label: string;
  emoji: string;
  color: string;
  action?: () => void;
  href?: string;
  onClick?: () => void;
}

export default function FloatingActionBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { openEnquiry } = useEnquiryModal();

  // Show FAB only after scrolling past the hero
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const actions: Action[] = [
    {
      label: 'Enquire for Bungalow Plots',
      emoji: '🏡',
      color: 'var(--accent-gold)',
      action: () => { openEnquiry('', ENQUIRY_CONTEXTS.PLOT); setIsOpen(false); }
    },
    {
      label: 'Enquire for Apartments',
      emoji: '🏢',
      color: '#0f172a',
      action: () => { openEnquiry('', ENQUIRY_CONTEXTS.APARTMENT); setIsOpen(false); }
    },
    {
      label: 'WhatsApp Expert Now',
      emoji: '📱',
      color: '#25D366',
      href: 'https://wa.me/917996645777?text=I%20am%20interested%20in%20Nanded%20City%20properties',
      onClick: () => gtmEvents.whatsappClick('floating_bar')
    },
    {
      label: 'Call Us +91 7996645777',
      emoji: '📞',
      color: '#3b82f6',
      href: 'tel:+917996645777',
      onClick: () => gtmEvents.phoneCallClick('floating_bar')
    }
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{ position: 'fixed', bottom: '28px', right: '24px', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}
        >
          {/* Action items */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                {actions.map((a, idx) =>
                  a.href ? (
                    <motion.a
                      key={a.label}
                      href={a.href}
                      target={a.href.startsWith('http') ? '_blank' : undefined}
                      rel={a.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={a.onClick}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 20px', borderRadius: '100px',
                        backgroundColor: a.color, color: '#fff',
                        fontWeight: '700', fontSize: '0.85rem',
                        textDecoration: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span>{a.emoji}</span> {a.label}
                    </motion.a>
                  ) : (
                    <motion.button
                      key={a.label}
                      onClick={a.action}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 20px', borderRadius: '100px',
                        backgroundColor: a.color, color: '#fff',
                        fontWeight: '700', fontSize: '0.85rem',
                        border: 'none', cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span>{a.emoji}</span> {a.label}
                    </motion.button>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            style={{
              width: '58px', height: '58px', borderRadius: '50%',
              backgroundColor: isOpen ? '#0f172a' : 'var(--accent-gold)',
              color: '#fff', border: 'none', cursor: 'pointer',
              fontSize: '1.4rem', boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.3s ease'
            }}
          >
            {isOpen ? '✕' : '🏠'}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
