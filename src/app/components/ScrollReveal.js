'use client';

import { motion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, yOffset = 40, duration = 0.8, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
