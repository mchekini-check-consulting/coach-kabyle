"use client";

import { useEffect, useRef } from "react";

const FITS = [
  "Tu veux lancer quelque chose qui vient vraiment de toi — pas copier le modèle des autres.",
  "Tu te bats contre le syndrome de l'imposteur depuis bien trop longtemps.",
  "Tu as des idées mais aucune ne semble être LA bonne — alors tu n'en lances aucune.",
  "Tu veux une méthode structurée, pas des conseils vagues de plus.",
  "Tu veux vraiment investir du temps et de l'énergie sur ce projet.",
  "Tu sais que tu as quelque chose à construire — il manque juste la direction.",
];

export function ForWho() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.07, rootMargin: "0px 0px -5% 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="pour-qui" className="fw-section">
      <style>{`
        .fw-section {
          background: var(--bg-2);
          padding: 88px 24px;
        }
        .fw-inner {
          max-width: 920px;
          margin: 0 auto;
        }
        .fw-head {
          text-align: center;
          margin-bottom: 52px;
        }
        .fw-h2 {
          font-family: var(--serif);
          font-size: clamp(32px, 6vw, 52px);
          line-height: 1.08; letter-spacing: -0.025em;
          color: var(--choco-2); margin-top: 16px;
          text-wrap: balance;
        }
        .fw-h2 em { font-style: italic; color: var(--nude-2); }
        .fw-sub {
          font-size: 15px; line-height: 1.65; color: var(--ink-soft);
          max-width: 46ch; margin: 16px auto 0;
        }
        .fw-grid {
          display: flex; flex-direction: column; gap: 0;
          margin-bottom: 48px;
        }
        .fw-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 20px 0;
          border-bottom: 1px solid var(--line-2);
          font-size: 15px; line-height: 1.5; color: var(--choco-2);
        }
        .fw-item:first-child { border-top: 1px solid var(--line-2); }
        .fw-check {
          width: 22px; height: 22px; border-radius: 999px;
          background: rgba(201,148,58,.13); color: var(--gold);
          border: 1px solid rgba(201,148,58,.22);
          display: grid; place-items: center;
          font-size: 10.5px; flex-shrink: 0; margin-top: 2px;
          font-weight: 700;
        }
        .fw-cta-wrap { text-align: center; }
        .fw-cta {
          display: inline-flex; align-items: center; gap: 10px;
          min-height: 56px; padding: 0 36px;
          background: var(--choco-2); color: var(--bg);
          border-radius: 999px;
          font-size: 14.5px; font-weight: 600; letter-spacing: 0.02em;
          box-shadow: 0 16px 36px -14px rgba(43,26,18,.45);
          transition: transform .25s ease, box-shadow .35s ease, background .2s ease;
        }
        .fw-cta:hover {
          background: #1A1108;
          transform: translateY(-2px);
          box-shadow: 0 24px 52px -16px rgba(43,26,18,.6);
        }
        .fw-cta-note {
          margin-top: 16px; font-size: 11.5px;
          color: var(--ink-light); letter-spacing: 0.1em; text-transform: uppercase;
        }
        @media (min-width: 900px) {
          .fw-section { padding: 120px 80px; }
          .fw-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0 56px;
          }
          .fw-item:nth-child(2) { border-top: 1px solid var(--line-2); }
          .fw-item:nth-last-child(1),
          .fw-item:nth-last-child(2) { border-bottom: none; }
        }
        @media (min-width: 1200px) {
          .fw-section { padding: 140px 120px; }
        }
      `}</style>

      <div className="fw-inner">
        <div className="fw-head reveal">
          <span className="eyebrow">
            <span className="rule" />C&apos;est fait pour toi
          </span>
          <h2 className="fw-h2">
            Tu te reconnais dans <em>au moins 3 de ces phrases</em> ?
          </h2>
          <p className="fw-sub">
            Alors cet ebook est exactement au bon moment pour toi.
          </p>
        </div>

        <div className="fw-grid">
          {FITS.map((text, i) => (
            <div key={i} className="fw-item reveal" data-d={String((i % 3) + 1)}>
              <span className="fw-check">✓</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="fw-cta-wrap reveal" data-d="3">
          <a href="#problemes" className="fw-cta">
            Oui, c&apos;est exactement pour moi →
          </a>
          <p className="fw-cta-note">Accès immédiat · PDF · 29,12 €</p>
        </div>
      </div>
    </section>
  );
}
