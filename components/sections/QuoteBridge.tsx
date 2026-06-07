"use client";

import { useEffect, useRef } from "react";

export function QuoteBridge() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="qb-section">
      <style>{`

        .qb-section {
          background: var(--bg-2);
          padding: 80px 28px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        /* Trait horizontal or — haut et bas */
        .qb-section::before,
        .qb-section::after {
          content: '';
          position: absolute; left: 50%; transform: translateX(-50%);
          width: 56px; height: 1px;
          background: var(--gold); opacity: .5;
        }
        .qb-section::before { top: 0; }
        .qb-section::after  { bottom: 0; }

        /* Orb ambiant */
        .qb-orb {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(201,148,58,.07) 0%, transparent 65%);
          top: -160px; left: 50%; transform: translateX(-50%);
          filter: blur(80px);
        }

        .qb-inner {
          position: relative; z-index: 1;
          max-width: 760px; margin: 0 auto;
        }

        /* Ornement central */
        .qb-mark {
          display: inline-flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid var(--gold-border);
          background: rgba(201,148,58,.07);
          color: var(--gold); font-size: 10px;
          margin-bottom: 28px;
        }

        /* Grand guillemet décoratif */
        .qb-quote-mark {
          font-family: var(--serif);
          font-size: 80px; line-height: .6;
          color: rgba(201,148,58,.15);
          display: block; margin-bottom: 8px;
          letter-spacing: -0.05em;
        }

        /* Citation principale */
        .qb-text {
          font-family: var(--serif);
          font-size: clamp(24px, 4.5vw, 42px);
          line-height: 1.2; letter-spacing: -0.03em;
          color: var(--choco-2); font-weight: 700;
          margin-bottom: 24px;
          text-wrap: balance;
        }
        .qb-text em {
          font-style: italic;
          color: var(--nude-3);
        }

        /* Sous-ligne */
        .qb-sub {
          font-size: 15px; line-height: 1.65;
          color: var(--ink-soft);
          max-width: 52ch; margin: 0 auto 32px;
        }

        /* Pilules de preuves */
        .qb-pills {
          display: flex; flex-wrap: wrap;
          justify-content: center; gap: 10px;
        }
        .qb-pill {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 16px;
          background: rgba(250,250,247,.8);
          border: 1px solid var(--line-2);
          border-radius: 999px;
          font-size: 12.5px; font-weight: 500;
          color: var(--choco-2);
          backdrop-filter: blur(6px);
        }
        .qb-pill-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0;
        }

        @media (min-width: 900px) {
          .qb-section { padding: 100px 80px; }
          .qb-text { font-size: clamp(32px, 3.6vw, 48px); }
        }
      `}</style>

      <div className="qb-orb" aria-hidden />

      <div className="qb-inner">
        <span className="qb-mark reveal" aria-hidden>◆</span>

        <span className="qb-quote-mark reveal" aria-hidden>‟</span>

        <h2 className="qb-text reveal" data-d="1">
          Ce n&apos;est pas une question de talent.<br />
          C&apos;est une question de <em>méthode.</em>
        </h2>

        <p className="qb-sub reveal" data-d="2">
          Chaque personne qui a lancé un business solide n&apos;était pas plus douée que toi. Elle avait juste une direction claire — et les bons outils pour avancer.
        </p>

        <div className="qb-pills reveal" data-d="3">
          <span className="qb-pill">
            <span className="qb-pill-dot" aria-hidden />
            70+ pages actionnables
          </span>
          <span className="qb-pill">
            <span className="qb-pill-dot" aria-hidden />
            Méthode en 3 piliers
          </span>
          <span className="qb-pill">
            <span className="qb-pill-dot" aria-hidden />
            Résultats dès les premières pages
          </span>
        </div>
      </div>
    </section>
  );
}
