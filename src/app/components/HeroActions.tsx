"use client";

import { useEnquiryModal } from '../context/ModalContext';

export default function HeroActions() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <div className="hero-actions">
      <a href="#ongoing" className="btn btn-gold">Explore Projects</a>
      <button 
        onClick={() => openEnquiry()} 
        className="btn btn-outline" 
        style={{ cursor: 'pointer', background: 'transparent' }}
      >
        Contact Us
      </button>
    </div>
  );
}
