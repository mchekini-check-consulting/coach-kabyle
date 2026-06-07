"use client";

import { motion } from "framer-motion";
import { floatingSlow } from "./variants";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
}

export function FloatingElement({
  children,
  className,
  delay = 0,
  amplitude = 12,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        transition: {
          duration: 8 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      variants={floatingSlow}
    >
      {children}
    </motion.div>
  );
}
