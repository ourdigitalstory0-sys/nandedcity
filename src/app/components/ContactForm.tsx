"use client";

import React from 'react';
import { Cluster } from '@/types';
import { SITE_CONFIG } from '@/config/site';
import StepForm from './StepForm';

interface ContactFormProps {
  ongoingClusters: Cluster[];
}

export default function ContactForm({ ongoingClusters }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  return (
    <div className="contact-form" style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
      {!isSubmitted && (
        <>
          <h3 style={{ color: '#fff', marginBottom: '8px', fontSize: '1.4rem' }}>Request Priority Consultation</h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', marginBottom: '24px' }}>Secure the latest inventory and special price list for Nanded City.</p>
        </>
      )}
      
      <div style={{ marginTop: '10px' }}>
        <StepForm 
          theme="dark" 
          context="general"
          onSuccess={() => setIsSubmitted(true)}
        />
      </div>

      {!isSubmitted && (
        <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: '20px', lineHeight: '1.5' }}>
          Authorized Partner: A{SITE_CONFIG.contact.phoneNumeric}<br />
          MahaRERA: P52100055134 · P52100051948 · P52100051867
        </p>
      )}
    </div>
  );
}
