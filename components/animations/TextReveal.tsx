"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { textRevealContainer, textRevealChar } from "./variants";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  tag: Tag = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const words = text.split(" ");

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} aria-label={text}>
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={textRevealContainer}
        transition={{ delay }}
        className="inline-flex flex-wrap gap-x-[0.25em]"
        aria-hidden
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              variants={textRevealChar}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
