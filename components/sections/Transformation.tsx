"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function Transformation() {
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

  const before = ["Confusion permanente", "Surcharge mentale", "Manque de confiance", "Idées floues, jamais lancées"];
  const after  = ["Clarté sur ton chemin", "Direction nette et alignée", "Confiance ancrée", "Vision business assumée"];

  return (
    <section ref={ref} className="tr-section">
      <style>{`

        .tr-section {
          background: var(--bg-2);
          position: relative;
          overflow: hidden;
        }

        /* ── MOBILE : empilé ── */
        .tr-inner {
          display: grid;
          grid-template-columns: 1fr;
        }

        /* Photo — fond crème de l'image = seamless avec --bg */
        .tr-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: var(--bg-2);
          order: 1;
        }
        .tr-photo-wrap img {
          filter: contrast(1.02) saturate(.92);
          mix-blend-mode: multiply;
        }

        /* Contenu */
        .tr-content {
          padding: 8px 28px 72px;
          order: 2;
        }

        /* Eyebrow */
        .tr-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 10px; letter-spacing: 0.36em; text-transform: uppercase;
          color: var(--nude-3); font-weight: 500; margin-bottom: 16px;
        }
        .tr-eyebrow::before {
          content: ''; width: 20px; height: 1px;
          background: var(--gold); opacity: .65; flex-shrink: 0;
        }

        /* Titre */
        .tr-h2 {
          font-family: var(--serif);
          font-size: clamp(32px, 7vw, 52px);
          line-height: 1.06; letter-spacing: -0.03em;
          color: var(--choco-2); font-weight: 700;
          margin-bottom: 40px; text-wrap: balance;
        }
        .tr-h2 em { font-style: italic; color: var(--nude-2); }

        /* Grille avant / après */
        .tr-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 36px;
        }

        .tr-col {
          border-radius: 16px;
          padding: 24px 20px;
        }
        .tr-col--before {
          background: var(--bg-3);
          border: 1px solid var(--line);
        }
        .tr-col--after {
          background: var(--choco-2);
          border: 1px solid transparent;
        }

        .tr-col-label {
          font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase;
          font-weight: 600; margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .tr-col--before .tr-col-label { color: var(--ink-light); }
        .tr-col--after  .tr-col-label { color: var(--gold); }
        .tr-col-label::before {
          content: ''; display: block; width: 12px; height: 1px;
          background: currentColor; opacity: .6;
        }

        .tr-list { display: flex; flex-direction: column; gap: 10px; }
        .tr-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13.5px; line-height: 1.4;
        }
        .tr-col--before .tr-item { color: var(--ink-soft); }
        .tr-col--after  .tr-item { color: rgba(246,241,235,.88); }

        .tr-dot {
          width: 18px; height: 18px; border-radius: 50%;
          display: grid; place-items: center;
          flex-shrink: 0; margin-top: 1px;
          font-size: 9px; font-weight: 700;
        }
        .tr-dot--x  { background: rgba(58,36,24,.08); color: var(--ink-soft); }
        .tr-dot--ok { background: rgba(201,148,58,.18); color: var(--gold); }

        /* CTA */
        .tr-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--nude-3); font-weight: 500;
          transition: color .2s ease;
        }
        .tr-cta svg { transition: transform .25s ease; }
        .tr-cta:hover { color: var(--choco-2); }
        .tr-cta:hover svg { transform: translateX(4px); }

        /* ════════════════════════════════
           DESKTOP — photo droite, texte gauche
        ════════════════════════════════ */
        @media (min-width: 900px) {
          .tr-inner {
            grid-template-columns: 55fr 45fr;
            min-height: 80vh;
            align-items: center;
          }

          .tr-content {
            padding: 80px 72px 80px 80px;
            order: 1;
          }

          .tr-photo-wrap {
            aspect-ratio: unset;
            height: 100%;
            min-height: 600px;
            order: 2;
          }

          /* Desktop : fondu gauche */
          .tr-photo-wrap::before {
            content: '';
            position: absolute; top: 0; left: 0; bottom: 0;
            width: 25%; z-index: 1; pointer-events: none;
            background: linear-gradient(to right, var(--bg-2), transparent);
          }
          .tr-photo-wrap::after { display: none; }

          .tr-cols { gap: 20px; }
          .tr-item { font-size: 14px; }
        }

        @media (min-width: 1200px) {
          .tr-content { padding: 100px 88px 100px 96px; }
        }
      `}</style>

      <div className="tr-inner">
        {/* Contenu */}
        <div className="tr-content">
          <span className="tr-eyebrow reveal">Ta transformation</span>

          <h2 className="tr-h2 reveal" data-d="1">
            De la confusion<br />à la <em>clarté absolue.</em>
          </h2>

          <div className="tr-cols">
            <div className="tr-col tr-col--before reveal" data-d="2">
              <div className="tr-col-label">Avant</div>
              <div className="tr-list">
                {before.map((t) => (
                  <div key={t} className="tr-item">
                    <span className="tr-dot tr-dot--x">×</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="tr-col tr-col--after reveal" data-d="3">
              <div className="tr-col-label">Après</div>
              <div className="tr-list">
                {after.map((t) => (
                  <div key={t} className="tr-item">
                    <span className="tr-dot tr-dot--ok">✓</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Photo */}
        <div className="tr-photo-wrap reveal" data-d="1">
          <Image
            src="/Persona 2.png"
            alt=""
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
