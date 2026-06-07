import type { Variants } from "framer-motion";

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;
const EASE_SMOOTH = [0.4, 0, 0.2, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_LUXURY },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_LUXURY },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_LUXURY },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_LUXURY },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const textRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const textRevealChar: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.5, ease: EASE_LUXURY },
  },
};

export const floating: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatingSlow: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-12, 12, -12],
    transition: {
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: EASE_LUXURY },
  },
};

export const shimmer: Variants = {
  hidden: { backgroundPosition: "200% center" },
  visible: {
    backgroundPosition: "-200% center",
    transition: { duration: 3, repeat: Infinity, ease: "linear" },
  },
};
