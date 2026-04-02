import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0a1628 0%, #0e2616 50%, #1a0e2e 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,170,110,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,170,110,0.1) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            padding: '8px 20px',
            borderRadius: '30px',
            border: '1px solid rgba(200,170,110,0.3)',
            background: 'rgba(200,170,110,0.08)',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: '#c8aa6e',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              display: 'flex',
            }}
          >
            700+ Acres · Sinhagad Road · Pune
          </div>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '16px',
            display: 'flex',
          }}
        >
          Nanded City Pune
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            marginBottom: '40px',
            display: 'flex',
          }}
        >
          Premium Residential Flats & Branded NA Plots
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#c8aa6e', display: 'flex' }}>15,000+</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex' }}>Families</div>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)', display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#c8aa6e', display: 'flex' }}>13+</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex' }}>Clusters</div>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)', display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#c8aa6e', display: 'flex' }}>MahaRERA</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex' }}>Verified</div>
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '32px',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.3)',
            fontWeight: 600,
            display: 'flex',
          }}
        >
          nandedcitypune.com
        </div>
      </div>
    ),
    { ...size }
  );
}
