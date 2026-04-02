'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxHero({ bgImage, children }) {
  return (
    <section 
      className="hero" 
      style={{ position: 'relative', overflow: 'hidden' }}
      aria-label="Nanded City Hero"
    >
      <Image
        src={bgImage}
        alt="Nanded City Township"
        fill
        priority
        fetchPriority="high"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          position: 'absolute',
          zIndex: 0,
        }}
        sizes="100vw"
      />
      {/* Dark overlay for text legibility */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(20, 45, 30, 0.82), rgba(20, 45, 30, 0.72))',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      
      <motion.div 
        className="container hero-inner"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ zIndex: 2, position: 'relative' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
