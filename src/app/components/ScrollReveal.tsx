"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  yOffset?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  staggerDelay = 0.1,
  yOffset = 30, 
  duration = 0.8, 
  className = "",
  style 
}: ScrollRevealProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: yOffset, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item} transition={{ duration, ease: [0.22, 1, 0.36, 1] }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
