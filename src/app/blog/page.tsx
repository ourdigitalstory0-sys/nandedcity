"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogs, blogCategories, BlogPost, BlogCategory } from '../../data/blogs';
import ScrollReveal from '../components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogHub() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredBlogs: BlogPost[] = blogs.filter(blog => 
    activeCategory === 'all' || blog.category === activeCategory
  );

  return (
    <div style={{ backgroundColor: '#f8fafc', paddingBottom: '80px', paddingTop: '120px' }}>
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-eyebrow">Expert Perspectives</span>
          <h1 style={{ color: '#0f172a', marginBottom: '16px' }}>Nanded City Market Insights</h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: '#475569', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Authoritative analysis on the <strong>Sinhagad Road real estate market</strong>, township lifestyle data, 
            and strategic investment guides for NA bungalow plots.
          </p>
        </ScrollReveal>

        {/* Category Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '40px', marginBottom: '50px' }}>
          {blogCategories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '10px 24px',
                borderRadius: '100px',
                border: `1px solid ${activeCategory === cat.id ? 'var(--accent-gold)' : '#e2e8f0'}`,
                backgroundColor: activeCategory === cat.id ? 'var(--accent-gold)' : '#fff',
                color: activeCategory === cat.id ? '#fff' : '#64748b',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeCategory === cat.id ? '0 10px 15px -3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <motion.div layout className="grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog) => (
              <motion.article 
                key={blog.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="cluster-card"
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <Link href={`/blog/${blog.slug}`} className="card-image-link" style={{ position: 'relative', display: 'block', height: '240px' }}>
                  <Image 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    fill 
                    sizes="(max-width:768px) 100vw, 33vw" 
                    style={{ objectFit: 'cover' }} 
                  />
                  <div className="card-badge-wrap" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                    <span className="badge" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.75rem', padding: '4px 10px' }}>
                      {blog.readTime}
                    </span>
                  </div>
                </Link>
                <div className="card-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {blog.category.replace('-', ' ')} • {blog.date}
                  </div>
                  <h2 style={{ fontSize: '1.25rem', lineHeight: '1.4', marginBottom: '12px', color: '#1e293b' }}>
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>
                    {blog.excerpt}
                  </p>
                  <Link href={`/blog/${blog.slug}`} className="btn-details" style={{ alignSelf: 'flex-start' }}>
                    Read Complete Data →
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
