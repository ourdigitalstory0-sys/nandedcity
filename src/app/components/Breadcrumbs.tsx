"use client";

import React from 'react';
import Link from 'next/link';
import { BreadcrumbList, WithContext } from 'schema-dts';
import { SITE_CONFIG } from '@/config/site';



interface BreadcrumbItem {
  name: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.href ? `${SITE_CONFIG.baseUrl}${item.href}` : SITE_CONFIG.baseUrl
    }))
  };


  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '20px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0, gap: '8px', alignItems: 'center' }}>
        {items.map((item, index) => (
          <li key={item.href} style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            {index > 0 && <span style={{ margin: '0 8px', opacity: 0.3 }}>/</span>}
            {item.current || !item.href ? (
              <span aria-current="page" style={{ color: item.current ? 'var(--accent-gold)' : 'inherit', fontWeight: item.current ? '600' : 'normal' }}>
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="hover-gold"
                style={{ 
                  color: 'inherit', 
                  textDecoration: 'none', 
                  transition: 'color 0.2s' 
                }}
              >
                {item.name}
              </Link>
            )}

          </li>
        ))}
      </ol>
      <style jsx>{`
        .hover-gold:hover {
          color: var(--accent-gold) !important;
        }
      `}</style>
    </nav>
  );
}
