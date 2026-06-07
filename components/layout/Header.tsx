"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, NAV_ITEMS } from "@/constants";

export function Header() {
  const [stuck, setStuck]     = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        /* ── NAV BASE — transparent sur hero clair ── */
        .nav {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 24px;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background .4s ease, border-color .4s ease,
                      box-shadow .4s ease, padding .3s ease;
        }

        /* ── STUCK — fond blanc solide ── */
        .nav.is-stuck {
          padding: 13px 24px;
          background: rgba(250,250,247,.92);
          -webkit-backdrop-filter: blur(18px) saturate(1.2);
          backdrop-filter: blur(18px) saturate(1.2);
          border-bottom-color: var(--line-2);
          box-shadow: 0 2px 20px rgba(43,26,18,.07);
        }

        /* ── LOGO ── */
        .nav-logo {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--serif); font-size: 19px;
          color: var(--choco-2);
          letter-spacing: 0.015em;
          transition: opacity .25s ease;
          text-decoration: none;
        }
        .nav-logo:hover { opacity: .75; }

        /* Logo image rognée */
        .nav-logo-img {
          display: block;
          width: 96px; height: 96px;
          object-fit: cover;
          object-position: 50% 48%;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,.08));
          flex-shrink: 0;
          /* Déborde sans agrandir le header */
          margin: -18px 0;
        }

        /* ── LINKS (desktop) ── */
        .nav__links {
          display: none;
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%,-50%);
          gap: 32px;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink-soft);
        }
        .nav__links a {
          position: relative; padding: 5px 0;
          transition: color .22s ease;
        }
        .nav__links a::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width .28s cubic-bezier(.4,0,.2,1);
        }
        .nav__links a:hover { color: var(--choco-2); }
        .nav__links a:hover::after { width: 100%; }

        /* ── RIGHT SIDE ── */
        .nav-right { display: flex; align-items: center; gap: 8px; }

        /* ── CTA BUTTON ── */
        .nav-cta {
          display: none;
          align-items: center;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          font-weight: 500; padding: 9px 18px;
          border-radius: 999px;
          border: 1px solid var(--line);
          color: var(--choco-2);
          background: rgba(250,250,247,.6);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          transition: border-color .25s ease, background .25s ease, box-shadow .3s ease;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: rgba(250,250,247,.85);
          border-color: var(--gold-border);
          box-shadow: 0 0 0 3px var(--gold-glow);
        }
        .nav.is-stuck .nav-cta {
          background: var(--bg-2);
          -webkit-backdrop-filter: none; backdrop-filter: none;
        }

        /* ── BURGER ── */
        .nav-burger {
          display: flex; flex-direction: column; justify-content: center;
          width: 36px; height: 36px; padding: 0;
          background: none; border: none; cursor: pointer; position: relative;
        }
        .nav-burger span {
          display: block; width: 22px; height: 1.5px;
          background: var(--choco-2); border-radius: 2px;
          position: absolute; left: 7px;
          transition: transform .3s cubic-bezier(.4,0,.2,1),
                      opacity .25s ease, width .25s ease;
        }
        .nav-burger span:nth-child(1) { top: 11px; }
        .nav-burger span:nth-child(2) { top: 17px; width: 16px; }
        .nav-burger span:nth-child(3) { top: 23px; }
        .nav-burger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); width: 22px; }
        .nav-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-burger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          position: fixed; inset: 0; z-index: 90;
          background: var(--choco-2);
          display: flex; flex-direction: column;
          padding: 0;
          visibility: hidden;
          opacity: 0;
          transform: translateY(-12px);
          transition:
            opacity    .35s cubic-bezier(.4,0,.2,1),
            transform  .35s cubic-bezier(.4,0,.2,1),
            visibility 0s linear .35s;
        }
        .mobile-menu.open {
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity    .35s cubic-bezier(.4,0,.2,1),
            transform  .35s cubic-bezier(.4,0,.2,1),
            visibility 0s linear 0s;
        }

        /* Decorative grain inside mobile menu */
        .mobile-menu::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          opacity: .04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        .mobile-menu-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          height: 100%;
          padding: 88px 32px 44px;
        }

        /* eyebrow inside mobile menu */
        .mobile-menu-tag {
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--nude-2); margin-bottom: 32px;
          display: flex; align-items: center; gap: 10px;
        }
        .mobile-menu-tag::before {
          content: ''; width: 16px; height: 1px;
          background: var(--nude-2); opacity: .5;
        }

        /* Nav links */
        .mobile-menu nav {
          display: flex; flex-direction: column;
          border-top: 1px solid rgba(246,241,235,.08);
          flex: 1;
        }
        .mobile-menu nav a {
          font-family: var(--serif);
          font-size: clamp(28px, 8vw, 40px);
          font-weight: 400;
          color: rgba(250,250,247,.88);
          padding: 20px 0;
          border-bottom: 1px solid rgba(246,241,235,.08);
          transition: color .2s ease, padding-left .22s ease;
          letter-spacing: -0.02em;
        }
        .mobile-menu nav a:hover {
          color: #fff;
          padding-left: 10px;
        }

        /* Bottom CTA */
        .mobile-menu-bottom {
          padding-top: 32px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .cta-mobile-primary {
          display: block; text-align: center;
          padding: 18px 24px;
          background: var(--bg); color: var(--choco-2);
          border-radius: 999px;
          font-size: 14px; font-weight: 600; letter-spacing: 0.02em;
          font-family: var(--sans);
          transition: background .2s ease, transform .25s ease;
          box-shadow: 0 12px 32px rgba(0,0,0,.28);
          position: relative; overflow: hidden;
        }
        .cta-mobile-primary:hover { background: #fff; transform: translateY(-2px); }
        .cta-mobile-note {
          text-align: center;
          font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(246,241,235,.28);
        }

        /* ── DESKTOP ── */
        @media (min-width: 900px) {
          .nav { padding: 18px 64px; }
          .nav.is-stuck { padding: 13px 64px; }
          .nav__links { display: flex; }
          .nav-burger { display: none; }
          .nav-cta { display: inline-flex; }
          .mobile-menu { display: none !important; }
        }
        @media (min-width: 1200px) {
          .nav { padding: 18px 88px; }
          .nav.is-stuck { padding: 13px 88px; }
        }
      `}</style>

      <nav className={`nav ${stuck ? "is-stuck" : ""}`} id="nav" role="banner">
        {/* Logo */}
        <Link href="/" className="nav-logo" aria-label={SITE_CONFIG.name}>
          <Image
            src="/logo k1.png"
            alt={SITE_CONFIG.name}
            width={120}
            height={120}
            className="nav-logo-img"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="nav__links" role="navigation" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </div>

        {/* Right: CTA + burger */}
        <div className="nav-right">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            className={`nav-burger ${menuOpen ? "open" : ""}`}
          >
            <span aria-hidden />
            <span aria-hidden />
            <span aria-hidden />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-menu-inner">
          <p className="mobile-menu-tag">Navigation</p>

          <nav role="navigation" aria-label="Menu mobile">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mobile-menu-bottom">
            <a
              href="#acheter"
              className="cta-mobile-primary"
              onClick={() => setMenuOpen(false)}
            >
              Télécharger — {SITE_CONFIG.price}{SITE_CONFIG.currency}
            </a>
            <p className="cta-mobile-note">Accès immédiat · Garantie 14 jours</p>
          </div>
        </div>
      </div>
    </>
  );
}
