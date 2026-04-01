'use client';

import { motion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, yOffset = 40, duration = 0.8, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: [0.25, 0.8, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
