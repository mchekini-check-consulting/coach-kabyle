export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type AnimationVariant = "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right";
