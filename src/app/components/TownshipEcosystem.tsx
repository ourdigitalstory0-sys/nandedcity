"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Amenity {
  title: string;
  desc: string;
  icon: string;
  category: 'Education' | 'Healthcare' | 'Shopping' | 'Sports' | 'Civic';
}

const amenities: Amenity[] = [
  { 
    title: "Nanded City Public School", 
    desc: "ICSE & CBSE curriculum within the township gates. Walking distance for residents.", 
    icon: "🎓", 
    category: "Education" 
  },
  { 
    title: "Sahyadri Hospital", 
    desc: "24/7 internal multispeciality hospital for immediate healthcare access.", 
    icon: "🏥", 
    category: "Healthcare" 
  },
  { 
    title: "Destination Centre I & II", 
    desc: "Massive commercial hubs featuring top retail brands, banks, and supermarkets.", 
    icon: "🛒", 
    category: "Shopping" 
  },
  { 
    title: "Kridaangan Sports Complex", 
    desc: "State-of-the-art facilities for tennis, badminton, swimming, and cricket.", 
    icon: "🏟️", 
    category: "Sports" 
  },
  { 
    title: "Symphony IT Park", 
    desc: "Dedicated commercial tower for IT/ITES companies within the township.", 
    icon: "🏢", 
    category: "Civic" 
  },
  { 
    title: "Fire Station & Police Post", 
    desc: "Internal safety infrastructure ensuring 24/7 security and rapid response.", 
    icon: "🛡️", 
    category: "Civic" 
  }
];

export default function TownshipEcosystem() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Nanded City Township Infrastructure",
    "itemListElement": amenities.map((a, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": a.category === 'Education' ? 'School' : a.category === 'Healthcare' ? 'Hospital' : 'LocalBusiness',
        "name": a.title,
        "description": a.desc,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      }
    }))
  };

  return (
    <section style={{ padding: '100px 0', backgroundColor: '#fff' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-eyebrow">Township Ecosystem</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '12px' }}>A Self-Reliant Digital Fortress</h2>
          <p style={{ maxWidth: '700px', margin: '20px auto', color: '#64748b' }}>
            Nanded City isn't just a project; it's a 700-acre self-contained ecosystem. Explore the internal infrastructure that drives 100% of our community's needs.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {amenities.map((a, idx) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{
                padding: '40px',
                borderRadius: '32px',
                backgroundColor: '#f8fafc',
                border: '1px solid #f1f5f9',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              whileHover={{ 
                y: -8, 
                backgroundColor: '#fff', 
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)',
                borderColor: 'var(--accent-gold)'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '24px' }}>{a.icon}</div>
              <span style={{ 
                fontSize: '0.7rem', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                letterSpacing: '1px', 
                color: 'var(--accent-gold)',
                backgroundColor: 'rgba(197, 168, 114, 0.1)',
                padding: '4px 12px',
                borderRadius: '100px',
                display: 'inline-block',
                marginBottom: '16px'
              }}>
                {a.category}
              </span>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#0f172a' }}>{a.title}</h3>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
