"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ITEMS = [
  {
    svg: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2.5h10v9H2z"/><path d="M4.5 5h5M4.5 7.5h3"/></svg>,
    title: "Ebook complet",
    desc: "70+ pages éditoriales pensées comme un livre, pas un PDF.",
  },
  {
    svg: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5.5"/><circle cx="7" cy="7" r="1.5"/><path d="M7 1.5V3M7 11v1.5M1.5 7H3M11 7h1.5"/></svg>,
    title: "Méthode guidée",
    desc: "Une progression claire, jour après jour, sans surcharge.",
  },
  {
    svg: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9.5 2.5l2 2-6 6H3.5v-2l6-6z"/><path d="M8 4l2 2"/></svg>,
    title: "Exercices pratiques",
    desc: "Des prompts ciblés pour faire émerger ton idée juste.",
  },
  {
    svg: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="1.5" width="10" height="11" rx="1"/><path d="M4.5 5h5M4.5 7.5h5M4.5 10h3"/></svg>,
    title: "Workbook intégré",
    desc: "Imprime, complète, garde-le comme un journal de bord.",
  },
  {
    svg: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 1.5v4l2 2"/><path d="M7 1.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11z"/></svg>,
    title: "Accès immédiat",
    desc: "Livré dans ta boîte mail dès le paiement validé.",
  },
  {
    svg: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 7a4.5 4.5 0 014.5-4.5c1.5 0 2.8.7 3.7 1.8M11.5 7a4.5 4.5 0 01-4.5 4.5c-1.5 0-2.8-.7-3.7-1.8"/><path d="M11 3.5v2h-2M3 10.5v-2h2"/></svg>,
    title: "Mises à jour à vie",
    desc: "Toutes les nouvelles versions, sans surcoût.",
  },
];

export function WhatYouGet() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* Reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.07, rootMargin: "0px 0px -5% 0px" }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Active card detection */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".wyg-card"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const i = cards.indexOf(entry.target as HTMLElement);
            if (i !== -1) setActive(i);
          }
        });
      },
      { root: container, threshold: 0.55 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const scrollTo = (i: number) => {
    const card = scrollRef.current?.querySelectorAll<HTMLElement>(".wyg-card")[i];
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section ref={sectionRef} id="ce-que-tu-recois" className="wyg-section">
      <style>{`

        /* ══════════════════════════════════════
           SECTION — layout mobile first
        ══════════════════════════════════════ */
        .wyg-section {
          background: var(--bg-2);
          padding: 72px 0 64px;
        }

        /* Header avec padding */
        .wyg-head {
          padding: 0 24px;
          margin-bottom: 36px;
        }

        /* Photo */
        .wyg-photo {
          position: relative;
          width: 100%;
          height: 340px;
          overflow: hidden;
          margin-bottom: 36px;
          border-radius: 20px;
          background: var(--bg-3);
        }
        .wyg-photo img { object-fit: cover; object-position: center 20%; }

        /* ── CARROUSEL scroll-snap ── */
        .wyg-scroll {
          display: flex;
          gap: 10px;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 12px 10vw 16px;
        }
        .wyg-scroll::-webkit-scrollbar { display: none; }

        /* Carte */
        .wyg-card {
          flex-shrink: 0;
          width: 74vw;
          max-width: 320px;
          scroll-snap-align: center;
          background: var(--bg-3);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 24px 20px;
          display: flex; flex-direction: column; gap: 16px;
          opacity: 0.38;
          transform: scale(0.91);
          transition: opacity .35s ease, transform .35s ease,
                      border-color .35s ease, background .35s ease,
                      box-shadow .35s ease;
        }
        .wyg-card.active {
          opacity: 1;
          transform: scale(1);
          border-color: rgba(201,148,58,.3);
          background: var(--bg-2);
          box-shadow: 0 8px 28px rgba(43,26,18,.10);
        }
        /* Icône + texte en ligne dans la carte */
        .wyg-card-row {
          display: flex; gap: 14px; align-items: flex-start;
        }

        /* Icône */
        .wyg-icon {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(201,148,58,.12);
          border: 1px solid rgba(201,148,58,.22);
          color: var(--gold);
          display: grid; place-items: center;
          flex-shrink: 0;
        }
        .wyg-icon svg { width: 17px; height: 17px; }
        .wyg-card h4 {
          font-family: var(--serif);
          font-size: 16px; line-height: 1.25;
          letter-spacing: -0.01em;
          color: var(--choco-2); margin-bottom: 5px;
        }
        .wyg-card p {
          font-size: 13px; line-height: 1.55;
          color: var(--ink-soft);
        }

        /* Dots */
        .wyg-dots {
          display: flex; justify-content: center; gap: 6px;
          padding: 14px 24px 4px;
        }
        .wyg-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--line);
          border: none; cursor: pointer; padding: 0;
          transition: background .25s ease, width .25s ease;
        }
        .wyg-dot.active {
          background: var(--gold);
          width: 20px; border-radius: 999px;
        }

        /* Bonus & CTA */
        .wyg-bottom { padding: 0 24px; }
        .wyg-bonus {
          margin-top: 28px; padding: 28px 22px;
          background: var(--choco-2); border-radius: 18px;
          border: 1px solid rgba(201,148,58,.12);
          display: flex; align-items: flex-start; gap: 16px;
        }
        .wyg-bonus-star { font-size: 20px; flex-shrink: 0; color: var(--gold); margin-top: 2px; }
        .wyg-bonus h4 {
          font-family: var(--serif); font-size: 16px;
          color: var(--bg); margin-bottom: 5px; letter-spacing: -0.01em;
        }
        .wyg-bonus p { font-size: 13px; color: rgba(246,241,235,.7); line-height: 1.5; }
        .wyg-cta-wrap { margin-top: 24px; }
        .wyg-cta {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; min-height: 54px; padding: 0 24px;
          background: var(--choco-2); color: var(--bg);
          border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.02em;
          box-shadow: 0 12px 28px -12px rgba(43,26,18,.45);
          transition: transform .25s ease, background .2s ease;
        }
        .wyg-cta:hover { background: #1A1108; transform: translateY(-2px); }
        .wyg-cta-note {
          text-align: center; margin-top: 10px;
          font-size: 11px; color: var(--ink-light);
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* ── DESKTOP ── */
        @media (min-width: 900px) {
          .wyg-section { padding: 100px 80px; }
          .wyg-head    { padding: 0; margin-bottom: 44px; }
          .wyg-bottom  { padding: 0; }

          /* Deux colonnes côte à côte */
          .wyg-desktop-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            align-items: stretch;
          }
          .wyg-photo {
            height: auto; min-height: 520px;
            border-radius: 20px; margin-bottom: 0;
          }

          /* Grille classique à la place du carrousel */
          .wyg-scroll {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            overflow-x: visible;
            scroll-snap-type: none;
            padding: 0;
          }
          .wyg-card {
            width: auto; border-radius: 0;
            opacity: 1 !important; transform: none !important;
            background: transparent !important;
            border: none !important;
            border-bottom: 1px solid var(--line-2) !important;
            box-shadow: none !important;
            padding: 22px 20px 22px 0;
          }
          .wyg-card:nth-child(odd)  { padding-right: 24px; border-right: 1px solid var(--line-2) !important; }
          .wyg-card:nth-child(even) { padding-left: 24px; padding-right: 0; }
          .wyg-card:nth-last-child(-n+2) { border-bottom: none !important; }
          .wyg-card h4 { font-size: 15px; }
          .wyg-dots { display: none; }
        }

        @media (min-width: 1200px) {
          .wyg-section { padding: 120px 96px; }
          .wyg-desktop-grid { gap: 72px; }
        }
      `}</style>

      {/* Header */}
      <div className="wyg-head sec-head reveal">
        <span className="eyebrow"><span className="rule" />Ce que tu reçois</span>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px,7vw,50px)", lineHeight: 1.06, letterSpacing: "-0.025em", marginTop: 16, color: "var(--choco-2)", textWrap: "balance" }}>
          Tout pour passer <em style={{ fontStyle: "italic", color: "var(--nude-2)" }}>de l&apos;idée</em> à l&apos;action.
        </h2>
      </div>

      {/* Mobile : empilé / Desktop : grid 2 colonnes */}
      <div className="wyg-desktop-grid" style={{ padding: "0" }}>

        {/* Photo */}
        <div className="wyg-photo reveal" data-d="1">
          <Image
            src="/passer à l'action.png"
            alt="Passer à l'action"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="(min-width:900px) 50vw, 100vw"
          />
        </div>

        {/* Contenu droite */}
        <div>
          {/* Carrousel */}
          <div ref={scrollRef} className="wyg-scroll">
            {ITEMS.map(({ svg, title, desc }, i) => (
              <div key={title} className={`wyg-card${i === active ? " active" : ""}`}>
                <div className="wyg-card-row">
                  <span className="wyg-icon">{svg}</span>
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots mobile */}
          <div className="wyg-dots">
            {ITEMS.map((_, i) => (
              <button
                key={i}
                className={`wyg-dot${i === active ? " active" : ""}`}
                onClick={() => scrollTo(i)}
                aria-label={`Item ${i + 1}`}
              />
            ))}
          </div>

          {/* Bonus + CTA */}
          <div className="wyg-bottom">
            <div className="wyg-bonus reveal" data-d="2">
              <span className="wyg-bonus-star">✦</span>
              <div>
                <h4>Bonus — Plan de lancement 30 jours</h4>
                <p>Un calendrier offert pour passer de la vision à la première vente, étape par étape.</p>
              </div>
            </div>
            <div className="wyg-cta-wrap reveal" data-d="3">
              <a href="#acheter" className="wyg-cta">
                Oui, je veux tout ça — 29,12 € →
              </a>
              <p className="wyg-cta-note">Accès immédiat · Garantie 14 jours</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
