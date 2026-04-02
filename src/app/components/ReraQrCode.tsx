'use client';
import Image from 'next/image';

interface ReraQrCodeProps {
  reraUrl?: string | null;
  reraNumber?: string;
  qrImage?: string;
}

export default function ReraQrCode({ reraUrl, reraNumber, qrImage }: ReraQrCodeProps) {
  if (!qrImage) {
    return (
      <div className="rera-footer-item">
        <span className="rera-label-small">MahaRERA Registration Number</span>
        <span className="rera-number">{reraNumber}</span>
      </div>
    );
  }

  return (
    <div className="rera-qr-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '100px', height: '100px', background: '#fff', padding: '4px', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Image 
          src={qrImage} 
          alt={`MahaRERA QR Code for ${reraNumber}`} 
          fill 
          style={{ objectFit: 'contain' }} 
        />
      </div>
      {reraNumber && reraNumber !== 'Ongoing Registration' && (
        <span style={{ fontSize: '0.65rem', marginTop: '6px', fontWeight: 'bold' }}>{reraNumber}</span>
      )}
    </div>
  );
}
