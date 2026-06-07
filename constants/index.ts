import type { NavItem } from "@/types";

export const SITE_CONFIG = {
  name: "L'Éveil Business",
  tagline: "La méthode qui transforme ton ambition en revenu.",
  description:
    "Découvre comment trouver ton idée business naturellement. Un ebook business féminin pour entrepreneures ambitieuses — 70+ pages de méthode, exercices pratiques et workbook intégré.",
  url: "https://leveilbusiness.fr",
  ogImage: "/og-image.jpg",
  creator: "@leveilbusiness",
  contact: "contact@leveilbusiness.fr",
  price: "29,12",
  priceOriginal: "97",
  currency: "€",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "La méthode", href: "#methode" },
  { label: "Ce que tu reçois", href: "#contenu" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "FAQ", href: "#faq" },
];
