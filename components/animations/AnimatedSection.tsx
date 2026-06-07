"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "./variants";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  once?: boolean;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  stagger = false,
  once = true,
  threshold = 0.15,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const variants = stagger ? staggerContainer : fadeUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
