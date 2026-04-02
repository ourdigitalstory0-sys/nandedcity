"use client";

import React from 'react';
import { Cluster } from '@/types';

interface ContactFormProps {
  ongoingClusters: Cluster[];
}

export default function ContactForm({ ongoingClusters }: ContactFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you! Our team will contact you shortly.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3 style={{ color: '#fff', marginBottom: '24px', fontSize: '1.25rem' }}>Request a Free Site Visit</h3>
      <input type="text" id="contact-name" placeholder="Your Full Name" className="form-input" required />
      <input type="tel" id="contact-phone" placeholder="Mobile Number" className="form-input" required />
      <input type="email" id="contact-email" placeholder="Email Address (optional)" className="form-input" />
      <select id="contact-project" className="form-input form-select" defaultValue="">
        <option value="" disabled>Select Project of Interest</option>
        {ongoingClusters.map(c => (
          <option key={c.id} value={c.id}>{c.name} – {c.bhk}</option>
        ))}
      </select>
      <textarea id="contact-msg" placeholder="Additional Message (optional)" className="form-input form-textarea" rows={3} />
      <button type="submit" id="contact-submit" className="btn btn-gold" style={{ width: '100%' }}>
        Submit Enquiry →
      </button>
      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: '10px' }}>
        MahaRERA Reg. Nos: P52100051948 · P52100051867 · P52100055134 · PR1260002501621
      </p>
    </form>
  );
}
