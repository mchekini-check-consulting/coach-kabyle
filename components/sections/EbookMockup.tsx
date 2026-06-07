"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const BENEFITS = [
  "Une idée business qui te ressemble — pas copiée, pas forcée.",
  "La clarté mentale pour commencer sans attendre d'être parfaitement prêt·e.",
  "Un plan 30 jours pour passer de l'idée à ta première vente.",
  "La confiance ancrée dans qui tu es, pas dans ce que font les autres.",
  "Un workbook pratique à remplir au fil de ta lecture.",
];

const INCLUDES = [
  { ico: "📖", label: "70+ pages éditoriales", sub: "Format livre, pas PDF" },
  { ico: "🗺️", label: "3 piliers de méthode", sub: "Structurés et progressifs" },
  { ico: "✍️", label: "Exercices + workbook", sub: "Imprimables, à compléter" },
  { ico: "✦",  label: "Bonus — Plan 30 jours", sub: "Offert avec l'ebook" },
];

export function EbookMockup() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);


  return (
    <section ref={ref} id="acheter" className="sp-section">
      <style>{`
        /* ── LAYOUT ── */
        .sp-section {
          background: var(--bg-2);
          padding: 80px 24px;
        }
        .sp-grid {
          display: grid;
          gap: 56px;
          max-width: 1180px;
          margin: 0 auto;
        }

        /* ── LEFT: book + social proof ── */
        .sp-left {
          display: flex; flex-direction: column; align-items: center; gap: 32px;
        }
        .sp-social {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 18px;
          background: var(--bg-2); border-radius: 999px;
          border: 1px solid var(--line-2);
        }
        .sp-social-stars { color: #E9C796; font-size: 12px; letter-spacing: 2px; }
        .sp-social-text  { font-size: 12px; color: var(--ink-soft); }
        .sp-social-text b { font-weight: 600; color: var(--choco-2); }

        /* Mockup image — libre, sans conteneur */
        .sp-mockup-img {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 24px 48px rgba(43,26,18,.14));
        }
        /* Wrapper pour agrandir l'image sans overflow */
        .sp-left {
          margin: 0 -20px;
        }

        /* Format chips */
        .sp-chips {
          display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;
        }
        .sp-chip {
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-soft);
          padding: 6px 12px; border-radius: 999px;
          border: 1px solid var(--line-2);
          background: var(--bg);
        }

        /* ── RIGHT: sales pitch ── */
        .sp-right { display: flex; flex-direction: column; gap: 0; }

        .sp-tag {
          font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--nude-3); font-weight: 500;
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .sp-tag::before {
          content: ''; width: 18px; height: 1px;
          background: var(--nude-2); flex-shrink: 0;
        }

        .sp-h2 {
          font-family: var(--serif);
          font-size: clamp(28px, 4.5vw, 44px);
          line-height: 1.08; letter-spacing: -0.025em;
          color: var(--choco-2); margin-bottom: 10px;
        }
        .sp-h2 em { font-style: italic; color: var(--nude-2); }
        .sp-hook {
          font-size: 15px; line-height: 1.65; color: var(--ink-soft);
          margin-bottom: 32px; max-width: 48ch;
        }

        /* Benefits */
        .sp-benefits-label {
          font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--ink-light); margin-bottom: 14px; font-weight: 500;
        }
        .sp-benefits { display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
        .sp-benefit {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 14.5px; line-height: 1.5; color: var(--choco-2);
        }
        .sp-check {
          width: 20px; height: 20px; border-radius: 999px;
          background: rgba(199,165,138,.18); color: var(--nude-3);
          display: grid; place-items: center;
          font-size: 10px; flex-shrink: 0; margin-top: 1px;
          font-weight: 600;
        }

        /* Includes */
        .sp-includes {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
          margin-bottom: 36px;
        }
        .sp-inc {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px; border-radius: 12px;
          background: var(--bg-3); border: 1px solid var(--line-2);
        }
        .sp-inc-ico { font-size: 16px; line-height: 1; }
        .sp-inc-label { font-size: 12.5px; font-weight: 500; color: var(--choco-2); line-height: 1.2; }
        .sp-inc-sub { font-size: 11px; color: var(--ink-light); }

        /* Avis façon Shopify */
        .sp-reviews {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 20px; flex-wrap: wrap;
        }
        .sp-reviews-stars { color: var(--gold); font-size: 20px; letter-spacing: 3px; }
        .sp-reviews-score { font-size: 16px; font-weight: 600; color: var(--choco-2); }
        .sp-reviews-sep   { color: var(--line); }
        .sp-reviews-count {
          font-size: 13px; color: var(--ink-soft);
          text-decoration: underline; text-underline-offset: 3px;
          cursor: pointer;
        }

        /* Prix inline visible */
        .sp-price-inline {
          display: flex; align-items: center; flex-wrap: wrap; gap: 10px;
          margin-bottom: 28px; padding-bottom: 24px;
          border-bottom: 1px solid var(--line-2);
        }
        .sp-price-new {
          font-family: var(--serif);
          font-size: clamp(44px, 6vw, 62px);
          line-height: 1; letter-spacing: -0.03em;
          color: var(--choco-2); font-weight: 700;
        }
        .sp-price-old {
          font-size: 16px; color: var(--ink-light);
          text-decoration: line-through; align-self: flex-end; padding-bottom: 4px;
        }
        .sp-price-badge2 {
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          font-weight: 700; color: #fff;
          padding: 4px 10px; border-radius: 6px;
          background: #C9943A;
          align-self: flex-end; margin-bottom: 4px;
        }
        .sp-urgency-inline {
          display: flex; align-items: center; gap: 6px;
          font-size: 11.5px; color: var(--ink-soft);
          width: 100%; margin-top: -4px;
        }
        .sp-pulse {
          width: 7px; height: 7px; border-radius: 999px;
          background: var(--gold); flex-shrink: 0;
          box-shadow: 0 0 0 0 rgba(201,148,58,.5);
          animation: pulse 1.8s infinite;
        }

        /* CTA */
        .sp-cta {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; min-height: 60px; padding: 0 28px;
          background: var(--choco-2); color: var(--bg);
          border-radius: 999px;
          font-size: 15px; font-weight: 600; letter-spacing: 0.02em;
          margin-top: 32px;
          margin-bottom: 16px;
          box-shadow: 0 16px 40px -14px rgba(43,26,18,.55);
          transition: transform .25s ease, box-shadow .35s ease, background .2s ease;
        }
        .sp-cta:hover {
          background: #1A1108;
          transform: translateY(-2px);
          box-shadow: 0 24px 56px -16px rgba(43,26,18,.7);
        }
        .sp-cta-arrow { font-size: 18px; transition: transform .25s ease; }
        .sp-cta:hover .sp-cta-arrow { transform: translateX(4px); }

        /* Trust */
        .sp-trust {
          display: flex; justify-content: center; gap: 18px; flex-wrap: wrap;
          font-size: 11px; color: var(--ink-light);
          letter-spacing: 0.1em; text-transform: uppercase;
          padding-top: 16px; border-top: 1px solid var(--line-2);
        }
        .sp-trust span { display: inline-flex; align-items: center; gap: 6px; }
        .sp-guarantee {
          margin-top: 14px; padding: 16px 18px;
          background: rgba(199,165,138,.08);
          border: 1px solid rgba(199,165,138,.18);
          border-radius: 12px;
          font-size: 13px; line-height: 1.55; color: var(--ink-soft);
          text-align: center;
        }
        .sp-guarantee b { color: var(--choco-2); font-weight: 600; }

        /* ── DESKTOP ── */
        @media (min-width: 900px) {
          .sp-left { margin: 0; }
          .sp-section { padding: 100px 48px; }
          .sp-grid {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: start;
            max-width: 1400px;
            margin: 0 auto;
          }
          .sp-left { position: sticky; top: 100px; }
        }
        @media (min-width: 1200px) {
          .sp-section { padding: 120px 64px; }
          .sp-grid { gap: 80px; }
        }
        @media (min-width: 1400px) {
          .sp-section { padding: 120px 80px; }
          .sp-grid { gap: 96px; }
        }
      `}</style>

      <div className="sp-grid">

        {/* ── LEFT ── */}
        <div className="sp-left">
          <Image
            src="/mockup.png"
            alt="Mockup de l'ebook L'Éveil Business"
            width={660}
            height={480}
            className="sp-mockup-img reveal"
            data-d="1"
            priority
          />
        </div>

        {/* ── RIGHT ── */}
        <div className="sp-right">
          <span className="sp-tag reveal">L&apos;ebook</span>

          <h2 className="sp-h2 reveal" data-d="1">
            70 pages pour transformer<br />
            <em>tes idées en actions.</em>
          </h2>

          {/* Avis sous le titre — façon Shopify */}
          <div className="sp-reviews reveal" data-d="1">
            <span className="sp-reviews-stars">★★★★★</span>
            <span className="sp-reviews-score">4,9/5</span>
            <span className="sp-reviews-sep">·</span>
            <span className="sp-reviews-count">500+ lecteurs</span>
          </div>

          {/* Prix après les avis */}
          <div className="sp-price-inline reveal" data-d="2">
            <span className="sp-price-new">29,12 €</span>
            <span className="sp-price-old">49,00 €</span>
            <span className="sp-price-badge2">− 40 %</span>
            <div className="sp-urgency-inline">
              <span className="sp-pulse" />
              Offre de lancement
            </div>
          </div>

          <p className="sp-hook reveal" data-d="2">
            70+ pages de méthode, d'exercices et de clarté — pour celles et ceux qui savent qu'ils ont quelque chose à construire, mais qui ne savent pas encore par où commencer.
          </p>

          <p className="sp-benefits-label reveal" data-d="2">Ce que tu vas vraiment gagner :</p>
          <ul className="sp-benefits reveal" data-d="3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {BENEFITS.map((b) => (
              <li key={b} className="sp-benefit">
                <span className="sp-check">✓</span>
                {b}
              </li>
            ))}
          </ul>


          <a href="#" className="sp-cta reveal" data-d="5">
            Télécharger maintenant
            <span className="sp-cta-arrow">→</span>
          </a>

          <div className="sp-trust reveal" data-d="5">
            <span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M6.5 1l4.6 1.8v3.7C11.1 9.2 9 11 6.5 12 4 11 1.9 9.2 1.9 6.5V2.8L6.5 1z"/>
              </svg>
              Garantie 14 jours
            </span>
            <span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="2.5" y="5.5" width="8" height="5.5" rx=".8"/>
                <path d="M4 5.5V3.8a2.5 2.5 0 015 0v1.7"/>
              </svg>
              Paiement sécurisé
            </span>
            <span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="1.5" y="3.5" width="10" height="6" rx=".8"/>
                <path d="M1.5 6.5l5 3 5-3"/>
              </svg>
              Livré immédiatement
            </span>
          </div>

          <div className="sp-guarantee reveal" data-d="5">
            <b>Satisfaite ou remboursée — 14 jours.</b><br />
            Si tu lis l&apos;ebook et que tu n&apos;y trouves pas la clarté promise, je te rembourse sans question. Tu ne prends aucun risque.
          </div>
        </div>
      </div>
    </section>
  );
}
