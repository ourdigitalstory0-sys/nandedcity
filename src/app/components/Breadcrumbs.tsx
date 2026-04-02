"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  if (!items || items.length === 0) return null;

  // Breadcrumb Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.href ? `https://www.nanded-city.in${item.href}` : null,
    })),
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      style={{
        padding: '12px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(5px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
        <Link 
          href="/" 
          style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} 
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--accent-gold)')} 
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'inherit')}
        >
          Home
        </Link>
        
        {items.map((item, index) => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#cbd5e1' }}>/</span>
            {item.href && index < items.length - 1 ? (
              <Link 
                href={item.href} 
                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'inherit')}
              >
                {item.name}
              </Link>
            ) : (
              <span style={{ color: '#0f172a', fontWeight: '600' }}>{item.name}</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
