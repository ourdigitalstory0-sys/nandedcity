"use client";

import React from 'react';

interface EnquiryFormProps {
  clusterName: string;
  bhk?: string;
}

export default function EnquiryForm({ clusterName, bhk = "2 & 3 BHK" }: EnquiryFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Thank you for your interest in ${clusterName}! Our team will contact you shortly.`);
    (e.target as HTMLFormElement).reset();
  };

  const configs = bhk.split(/[,&]/).map(b => b.trim()).filter(Boolean);

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Your Full Name" className="form-input" required />
      <input type="tel" placeholder="Mobile Number" className="form-input" required />
      <input type="email" placeholder="Email Address" className="form-input" />
      <select className="form-input form-select" defaultValue="">
        <option value="" disabled>Select Configuration</option>
        {configs.map(b => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      <button type="submit" className="btn btn-gold" style={{ width: '100%', textAlign: 'center' }}>
        Request Site Visit →
      </button>
      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: '8px' }}>
        By submitting, you agree to be contacted by our sales team.
      </p>
    </form>
  );
}
