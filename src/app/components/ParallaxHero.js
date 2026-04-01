'use client';

import { motion } from 'framer-motion';

export default function ParallaxHero({ bgImage, children }) {
  return (
    <section 
      className="hero" 
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(20, 45, 30, 0.82), rgba(20, 45, 30, 0.72)), url('${bgImage}')`,
        backgroundAttachment: 'fixed', // This creates the pure CSS parallax effect
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      aria-label="Nanded City Hero"
    >
      <motion.div 
        className="container hero-inner"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
