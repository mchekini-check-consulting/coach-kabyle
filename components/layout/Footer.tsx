"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/constants";

const COLS = [
  {
    title: "L'ebook",
    links: [
      { label: "La méthode",    href: "#methode" },
      { label: "Le programme",  href: "#contenu" },
      { label: "Témoignages",   href: "#temoignages" },
      { label: "Télécharger",   href: "#acheter" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales",  href: "/mentions-legales", internal: true },
      { label: "Confidentialité",   href: "/confidentialite",  internal: true },
      { label: "CGV",               href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: SITE_CONFIG.contact, href: `mailto:${SITE_CONFIG.contact}` },
      { label: "FAQ",               href: "#faq" },
      { label: "Service client",    href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (title: string) =>
    setOpen((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <footer className="ft-root">
      <style>{`
        .ft-root {
          background: var(--choco-2);
          position: relative; overflow: hidden;
          padding: 48px 28px 36px;
        }
        .ft-orb {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(199,165,138,.045) 0%, transparent 65%);
          top: -200px; right: -120px; filter: blur(100px);
        }
        .ft-watermark {
          position: absolute;
          bottom: -60px; left: 50%; transform: translateX(-50%);
          font-family: var(--serif); font-style: italic;
          font-size: clamp(180px, 36vw, 400px); line-height: 1;
          color: rgba(233,199,150,.025);
          pointer-events: none; user-select: none;
          letter-spacing: -0.08em; white-space: nowrap;
        }
        .ft-inner {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
        }

        /* ── COLS accordion mobile ── */
        .ft-cols {
          display: flex; flex-direction: column;
          border-top: 1px solid rgba(246,241,235,.07);
          margin-bottom: 36px;
        }
        .ft-col-item { border-bottom: 1px solid rgba(246,241,235,.07); }

        /* Trigger mobile */
        .ft-col-trigger {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; background: none; border: none; cursor: pointer;
          padding: 16px 0; text-align: left;
        }
        .ft-col-title {
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(246,241,235,.4); font-weight: 500;
        }
        .ft-col-chevron {
          color: rgba(246,241,235,.3);
          transition: transform .25s ease;
          flex-shrink: 0;
        }
        .ft-col-chevron.open { transform: rotate(180deg); }

        /* Links panel */
        .ft-col-links {
          display: flex; flex-direction: column; gap: 10px;
          overflow: hidden;
          max-height: 0;
          transition: max-height .3s ease, padding .3s ease;
          padding-bottom: 0;
        }
        .ft-col-links.open {
          max-height: 200px;
          padding-bottom: 18px;
        }
        .ft-col-links a {
          font-size: 13px;
          color: rgba(246,241,235,.45);
          transition: color .2s ease;
        }
        .ft-col-links a:hover { color: rgba(246,241,235,.75); }

        /* ── BOTTOM BAR ── */
        .ft-bottom {
          padding-top: 24px;
          border-top: 1px solid rgba(246,241,235,.06);
          display: flex; flex-direction: column;
          align-items: center; gap: 16px;
        }
        .ft-copy {
          font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(246,241,235,.22); text-align: center;
        }

        /* Social icons */
        .ft-socials {
          display: flex; gap: 10px;
        }
        .ft-social-ico {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(246,241,235,.1);
          display: grid; place-items: center;
          color: rgba(246,241,235,.4);
          transition: color .25s ease, border-color .25s ease, background .25s ease;
        }
        .ft-social-ico:hover {
          color: var(--nude);
          border-color: rgba(199,165,138,.35);
          background: rgba(199,165,138,.07);
        }

        /* ── DESKTOP ── */
        @media (min-width: 640px) {
          .ft-cols {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            border-top: none;
            margin-bottom: 40px;
            padding-top: 40px;
            border-top: 1px solid rgba(246,241,235,.06);
          }
          .ft-col-item { border-bottom: none; }
          .ft-col-chevron { display: none; }
          .ft-col-links {
            max-height: none !important;
            padding-bottom: 0 !important;
            overflow: visible;
          }
          .ft-col-trigger { cursor: default; padding: 0 0 14px; }
          .ft-bottom { flex-direction: row; justify-content: space-between; }
          .ft-copy { text-align: left; }
        }
        @media (min-width: 900px) {
          .ft-root { padding: 56px 80px 40px; }
        }
        @media (min-width: 1200px) {
          .ft-root { padding: 56px 120px 44px; }
        }
      `}</style>

      <div className="ft-orb" aria-hidden />
      <div className="ft-watermark" aria-hidden>Éveil</div>

      <div className="ft-inner">

        {/* Colonnes accordéon */}
        <div className="ft-cols">
          {COLS.map(({ title, links }) => (
            <div key={title} className="ft-col-item">
              <button
                className="ft-col-trigger"
                onClick={() => toggle(title)}
                aria-expanded={!!open[title]}
              >
                <span className="ft-col-title">{title}</span>
                <svg
                  className={`ft-col-chevron${open[title] ? " open" : ""}`}
                  width="12" height="12" viewBox="0 0 12 12"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                >
                  <path d="M2 4.5l4 4 4-4" />
                </svg>
              </button>
              <div className={`ft-col-links${open[title] ? " open" : ""}`}>
                {links.map(({ label, href, internal }: { label: string; href: string; internal?: boolean }) =>
                  internal
                    ? <Link key={label} href={href}>{label}</Link>
                    : <a key={label} href={href}>{label}</a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom">
          <p className="ft-copy">© {year} {SITE_CONFIG.name} · Tous droits réservés</p>

          <div className="ft-socials" aria-label="Réseaux sociaux">
            <a href="#" className="ft-social-ico" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="2.5" y="2.5" width="11" height="11" rx="3"/>
                <circle cx="8" cy="8" r="2.8"/>
                <circle cx="11.4" cy="4.6" r="0.6" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="ft-social-ico" aria-label="Pinterest">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="8" cy="8" r="6"/>
                <path d="M7.4 5.5c1.6-.5 3.2.6 3.2 2.2 0 1.6-1.2 2.6-2.3 2.2-.6-.2-.7-.9-.5-1.7l.4-1.5"/>
                <path d="M6.5 13l1.4-5"/>
              </svg>
            </a>
            <a href="#" className="ft-social-ico" aria-label="TikTok">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M9.5 2v7.5a2.5 2.5 0 11-2.5-2.5"/>
                <path d="M9.5 2c.3 1.5 1.5 2.5 3 2.5"/>
              </svg>
            </a>
            <a href={`mailto:${SITE_CONFIG.contact}`} className="ft-social-ico" aria-label="Email">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="2" y="4" width="12" height="8" rx="1"/>
                <path d="M2 5l6 4 6-4"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
