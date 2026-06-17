'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error('Nanded City App Error:', error);
  }, [error]);

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
        <h1 style={{ fontSize: '4rem', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>Oops!</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--primary-green)', marginBottom: '24px' }}>Something went wrong.</h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '40px' }}>
          We hit a snag while trying to process your request. Don&apos;t worry, our luxury real estate portal is still here for you. Let&apos;s get you back on track.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            style={{ padding: '16px 32px', backgroundColor: 'var(--primary-green)', color: '#fff', border: 'none', borderRadius: '100px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}
          >
            Try again
          </button>
          <Link href="/" style={{ padding: '16px 32px', backgroundColor: '#f1f5f9', color: '#0f172a', textDecoration: 'none', borderRadius: '100px', fontSize: '1rem', fontWeight: '600' }}>
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
