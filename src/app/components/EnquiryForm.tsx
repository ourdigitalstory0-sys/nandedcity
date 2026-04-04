"use client";

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/site';
import StepForm from './StepForm';

interface EnquiryFormProps {
  clusterName: string;
  bhk?: string;
}

export default function EnquiryForm({ clusterName, bhk = "2 & 3 BHK" }: EnquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Determine context based on clusterName (Plot vs Apartment)
  const context = clusterName.toLowerCase().includes('plot') || clusterName.toLowerCase().includes('melody') 
    ? 'plot' 
    : 'apartment';

  return (
    <div className="enquiry-form-container" style={{ minHeight: '300px' }}>
      {!isSubmitted && (
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '4px' }}>Enquire about {clusterName}</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Get floor plans and site visit schedule.</p>
        </div>
      )}
      
      <StepForm 
        theme="light"
        context={context}
        initialProject={`${clusterName} (${bhk})`}
        onSuccess={() => setIsSubmitted(true)}
      />

      {!isSubmitted && (
        <p style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center', marginTop: '16px' }}>
          By continuing, you agree to official contact regarding Nanded City inventory.
        </p>
      )}
    </div>
  );
}
