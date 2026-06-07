"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const CREDS = [
  { val: "500+", label: "Personnes accompagnées" },
  { val: "3 ans", label: "Coaching & développement business" },
  { val: "4,9/5", label: "Satisfaction moyenne" },
];

export function Author() {
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
    <section ref={ref} id="auteure" className="au-section">
      <style>{`
        .au-section {
          background: var(--bg-2);
          padding: 88px 24px;
        }
        .au-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          gap: 48px;
        }
        .au-photo-wrap {
          position: relative;
          padding-right: 16px; padding-bottom: 16px;
        }
        .au-photo-wrap::after {
          content: '';
          position: absolute;
          top: 18px; left: 18px;
          right: 0; bottom: 0;
          border: 1px solid rgba(201,148,58,.24);
          border-radius: 28px;
          pointer-events: none; z-index: 0;
        }
        .au-photo {
          position: relative;
          border-radius: 24px; overflow: hidden;
          height: 400px;
          background: var(--bg-3);
          z-index: 1;
        }
        .au-photo::after {
          content: '';
          position: absolute; inset: 16px;
          border: 1px solid rgba(201,148,58,.28);
          border-radius: 14px;
          pointer-events: none; z-index: 2;
        }
        .au-content { display: flex; flex-direction: column; }
        .au-tag {
          font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--nude-3); font-weight: 500;
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 24px;
        }
        .au-tag::before {
          content: ''; width: 18px; height: 1px;
          background: var(--nude-2); flex-shrink: 0;
        }
        .au-name {
          font-family: var(--serif);
          font-size: clamp(38px, 6vw, 58px);
          line-height: 1.04; letter-spacing: -0.03em;
          color: var(--choco-2); margin-bottom: 8px;
        }
        .au-title {
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--nude-3); margin-bottom: 32px;
        }
        .au-story {
          font-size: 15.5px; line-height: 1.75;
          color: var(--ink-soft);
          margin-bottom: 36px;
        }
        .au-story em {
          font-style: italic; color: var(--choco-2);
          font-family: var(--serif);
        }
        .au-creds {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border: 1px solid var(--line-2);
          border-radius: 16px; overflow: hidden;
          margin-bottom: 36px;
        }
        .au-cred {
          padding: 18px 16px; text-align: center;
          border-right: 1px solid var(--line-2);
        }
        .au-cred:last-child { border-right: none; }
        .au-cred-val {
          font-family: var(--serif); font-style: italic;
          font-size: 26px; line-height: 1; letter-spacing: -0.02em;
          color: var(--choco-2); display: block; margin-bottom: 5px;
        }
        .au-cred-label {
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-light); line-height: 1.4;
        }
        .au-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--nude-3); font-weight: 500;
          transition: color .2s ease;
        }
        .au-cta svg { transition: transform .25s ease; }
        .au-cta:hover { color: var(--choco-2); }
        .au-cta:hover svg { transform: translateX(3px); }

        /* Decorative initial behind name */
        .au-deco-initial {
          position: absolute;
          right: -10px; top: -30px;
          font-family: var(--serif); font-style: italic;
          font-size: 160px; line-height: 1;
          color: rgba(176,137,104,.07);
          pointer-events: none; user-select: none;
          letter-spacing: -0.04em; z-index: 0;
        }
        /* Shimmer on CTA link */
        .au-cta-shimmer { position: relative; }

        @media (min-width: 900px) {
          .au-section { padding: 120px 80px; }
          .au-inner {
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 72px;
          }
          .au-photo { height: 100%; min-height: 520px; }
          .au-photo-wrap { height: 100%; }
        }
        @media (min-width: 1200px) {
          .au-section { padding: 140px 120px; }
          .au-inner { gap: 96px; }
        }
      `}</style>

      <div className="au-inner">
        <div className="au-photo-wrap reveal" data-d="1">
          <div className="au-photo">
            <Image
              src="/portrait-suit.jpg"
              alt="L'auteure de L'Éveil Business"
              fill
              style={{ objectFit: "cover", objectPosition: "center 12%" }}
              sizes="(min-width:900px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="au-content">
          <span className="au-tag reveal">La créatrice</span>

          <div style={{ position: "relative" }}>
            <span className="au-deco-initial" aria-hidden>K</span>
            <h2 className="au-name reveal" data-d="1" style={{ position: "relative", zIndex: 1 }}>Kahina</h2>
          </div>
          <div className="au-title reveal" data-d="1">Entrepreneuse · Coach business · Auteure</div>

          <p className="au-story reveal" data-d="2">
            J&apos;ai été exactement là où tu es. Pleine d&apos;idées, pleine d&apos;envie — mais sans direction. Je lançais, j&apos;arrêtais. Je doutais. Je recommençais sans vraiment avancer.<br /><br />
            Ce que j&apos;ai compris après des années : <em>le problème n&apos;était pas mes idées. C&apos;est que je ne les construisais pas à partir de moi.</em><br /><br />
            J&apos;ai condensé tout ce chemin — les erreurs, les prises de conscience, la méthode — dans cet ebook. Pour que tu n&apos;aies pas à tout recommencer de zéro.
          </p>

          <div className="au-creds reveal" data-d="3">
            {CREDS.map(({ val, label }) => (
              <div key={label} className="au-cred">
                <span className="au-cred-val">{val}</span>
                <span className="au-cred-label">{label}</span>
              </div>
            ))}
          </div>

          <a href="#acheter" className="au-cta reveal" data-d="3">
            Découvrir l&apos;ebook
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
