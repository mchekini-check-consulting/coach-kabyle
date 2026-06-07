import type { Metadata } from "next";
import { playfair, cormorant, inter } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { SITE_CONFIG } from "@/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "ebook business féminin",
    "entrepreneuriat féminin",
    "stratégie business",
    "coaching femme entrepreneur",
    "revenus en ligne",
    "freelance féminin",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.creator,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.creator,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
