"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnquiryModal } from '../context/ModalContext';

export default function DynamicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openEnquiry } = useEnquiryModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Apartments', href: '/#ongoing' },
    { name: 'Plots', href: '/#ongoing' },
    { name: 'Township', href: '/#township' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Legal', href: '/legal-compliance' },
    { name: 'Insights', href: '/blog' },
    { name: 'Contact', href: '/#contact' }
  ];

  return (
    <>
      <header 
        id="site-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: '16px 0',
          pointerEvents: 'none'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(20px)',
              padding: '6px 8px 6px 20px',
              borderRadius: '100px',
              boxShadow: scrolled ? '0 15px 35px -5px rgba(0,0,0,0.12), 0 5px 15px -5px rgba(0,0,0,0.08)' : '0 4px 15px -2px rgba(0,0,0,0.1)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              width: '100%',
              maxWidth: '1140px',
              marginTop: scrolled ? '0' : '8px',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              justifyContent: 'space-between'
            }}
          >
            {/* Left: Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', shrink: 0 }}>
              <Image 
                src="https://nandedcitypune.com/wp-content/themes/nandedcity/images/nc-logo.png" 
                alt="Nanded City" 
                width={140} 
                height={42} 
                style={{ objectFit: 'contain' }}
              />
            </Link>

            {/* Center: Desktop Nav (Hidden on Mobile) */}
            <nav className="desktop-only" style={{ display: 'flex', gap: '24px', marginLeft: '30px' }}>
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className="nav-link-premium"
                  style={{ 
                    color: '#475569', 
                    fontSize: '0.8rem', 
                    fontWeight: '700', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    textDecoration: 'none',
                    transition: 'color 0.23s ease'
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right: Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* WhatsApp Button (Hidden on very small screens if needed) */}
              <a 
                href="https://wa.me/917996645777" 
                target="_blank" 
                className="desktop-only"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: '#25D366',
                  color: '#fff',
                  borderRadius: '100px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)'
                }}
              >
                Connect
              </a>

              <button 
                onClick={() => openEnquiry()}
                className="btn-enquiry-glow"
                style={{
                  padding: '10px 24px',
                  backgroundColor: 'var(--accent-gold)',
                  color: '#fff',
                  borderRadius: '100px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Enquire
              </button>

              {/* Mobile Burger */}
              <button 
                className="mobile-only burger-btn"
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  display: 'none',
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: '20px', height: '2px', backgroundColor: '#0f172a', marginBottom: '4px', borderRadius: '2px' }} />
                <div style={{ width: '20px', height: '2px', backgroundColor: '#0f172a', marginBottom: '4px', borderRadius: '2px' }} />
                <div style={{ width: '14px', height: '2px', backgroundColor: '#0f172a', marginLeft: '6px', borderRadius: '2px' }} />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: '#fff',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              padding: '30px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
              <Image src="https://nandedcitypune.com/wp-content/themes/nandedcity/images/nc-logo.png" alt="Logo" width={100} height={30} />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '2rem', color: '#0f172a', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a', textDecoration: 'none' }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                onClick={() => { setMobileMenuOpen(false); openEnquiry(); }}
                style={{ padding: '20px', backgroundColor: 'var(--accent-gold)', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '1.1rem' }}
              >
                Enquire Now
              </button>
              <a 
                href="https://wa.me/917996645777" 
                style={{ padding: '18px', backgroundColor: '#25D366', color: '#fff', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', fontWeight: '700' }}
              >
                WhatsApp Experts
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 991px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: block !important;
          }
        }
        .nav-link-premium:hover {
          color: var(--accent-gold) !important;
        }
        .btn-enquiry-glow {
          box-shadow: 0 4px 14px 0 rgba(197, 168, 114, 0.39);
          transition: all 0.3s ease;
        }
        .btn-enquiry-glow:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(197, 168, 114, 0.55);
        }
      `}</style>
    </>
  );
}
