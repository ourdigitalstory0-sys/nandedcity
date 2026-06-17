import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8fafc',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '600px', backgroundColor: '#fff', padding: '60px 40px', borderRadius: '24px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h1 style={{ fontSize: '6rem', fontWeight: '800', color: 'var(--accent-gold)', marginBottom: '8px', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '24px' }}>Page Not Found</h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '40px' }}>
          It looks like you took a wrong turn in the township. The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ padding: '16px 32px', backgroundColor: 'var(--primary-green)', color: '#fff', textDecoration: 'none', borderRadius: '100px', fontSize: '1rem', fontWeight: '600' }}>
            Return to Homepage
          </Link>
          <Link href="/projects" style={{ padding: '16px 32px', backgroundColor: '#f1f5f9', color: '#0f172a', textDecoration: 'none', borderRadius: '100px', fontSize: '1rem', fontWeight: '600' }}>
            View Residential Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
