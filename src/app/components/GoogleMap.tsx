"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface GoogleMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  title: string;
}

export default function GoogleMap({ 
  lat = 18.4612, 
  lng = 73.8015, 
  zoom = 15, 
  title 
}: GoogleMapProps) {
  // Using official Google Maps Embed URL (Place mode)
  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=AIzaSy...&center=${lat},${lng}&zoom=${zoom}&maptype=satellite`;
  
  // Note: For a real production app, we'd use the Project's specific CID or Place ID.
  // For now, we'll use a high-fidelity coordinates-based embed which works globally.
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&t=k&output=embed`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      style={{ 
        width: '100%', 
        height: '450px', 
        borderRadius: '24px', 
        overflow: 'hidden', 
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)'
      }}
    >
      <iframe
        title={`${title} Location - Google Maps`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        src={embedUrl}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </motion.div>
  );
}
