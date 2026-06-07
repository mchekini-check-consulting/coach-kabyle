"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { num: 500,  suffix: "+",   label: "Femmes accompagnées",  detail: "et encore",   float: false },
  { num: 4.9,  suffix: "/5",  label: "Satisfaction moyenne", detail: "sur 5 étoiles", float: true  },
  { num: 3,    suffix: " ans", label: "D'expertise business", detail: "de terrain",   float: false },
  { num: 97,   suffix: "%",   label: "Recommandent l'ebook", detail: "à leur entourage", float: false },
];

export function StatsStrip() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const counters = ref.current?.querySelectorAll<HTMLElement>("[data-to]");
    if (!counters?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      ref.current?.classList.add("ready");

      counters.forEach((el, i) => {
        const to    = parseFloat(el.dataset.to ?? "0");
        const isF   = el.dataset.float === "1";
        const suf   = el.dataset.suffix ?? "";
        const dur   = 1300;

        setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const p    = Math.min(1, (now - start) / dur);
            const ease = 1 - Math.pow(1 - p, 3);
            const v    = ease * to;
            el.textContent = (isF ? v.toFixed(1) : Math.round(v).toString()) + suf;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }, i * 80);
      });
    }, { threshold: 0.35 });

    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="ss-wrap" aria-label="Chiffres clés">
      <style>{`
        /* ── Bande éditoriale ── */
        .ss-wrap {
          background: var(--bg-2);
          border-top: 1px solid var(--line-2);
          position: relative;
          overflow: hidden;
        }

        /* Pas de ligne haut — fond identique au Hero, continuité visuelle */

        /* Légère ombre bas qui annonce le chocolat de Problems */
        .ss-wrap::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 56px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(43,26,18,.05) 100%
          );
          pointer-events: none;
        }

        /* Grille 4 colonnes */
        .ss-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1100px; margin: 0 auto;
        }

        /* Cellule */
        .ss-cell {
          padding: 44px 28px 40px;
          position: relative;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
        }

        /* Séparateurs hairline internes */
        .ss-cell::after {
          content: '';
          position: absolute;
          pointer-events: none;
        }
        /* ligne de droite pour colonnes impaires */
        .ss-cell:nth-child(odd)::after {
          top: 16%; bottom: 16%; right: 0; width: 1px;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(176,137,104,.25) 35%,
            rgba(176,137,104,.25) 65%,
            transparent
          );
        }
        /* ligne du bas pour les deux premières cellules */
        .ss-cell:nth-child(-n+2)::before {
          content: '';
          position: absolute;
          bottom: 0; left: 12%; right: 12%; height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(176,137,104,.2) 40%,
            rgba(176,137,104,.2) 60%,
            transparent
          );
          pointer-events: none;
        }

        /* Trait décoratif au-dessus du chiffre */
        .ss-rule {
          width: 22px; height: 1px;
          background: var(--gold);
          margin-bottom: 16px;
          opacity: .75;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .6s cubic-bezier(.16,1,.3,1);
        }
        .ss-wrap.ready .ss-rule { transform: scaleX(1); }
        .ss-cell:nth-child(2) .ss-rule { transition-delay: .07s; }
        .ss-cell:nth-child(3) .ss-rule { transition-delay: .14s; }
        .ss-cell:nth-child(4) .ss-rule { transition-delay: .21s; }

        /* Le grand chiffre */
        .ss-num {
          font-family: var(--serif); font-style: italic;
          font-size: clamp(44px, 9vw, 68px);
          line-height: 1; letter-spacing: -0.035em;
          color: var(--choco-2);
          display: block; margin-bottom: 10px;
        }
        .ss-num [data-to] { display: inline; }

        /* Label */
        .ss-label {
          font-size: 10px; letter-spacing: 0.26em; text-transform: uppercase;
          color: var(--ink-soft);
          display: block; margin-bottom: 5px;
        }

        /* Détail sous le label */
        .ss-detail {
          font-family: var(--serif); font-style: italic;
          font-size: 12px;
          color: var(--ink-light);
        }

        @media (min-width: 640px) {
          .ss-grid { grid-template-columns: repeat(4, 1fr); }
          .ss-cell:nth-child(-n+2)::before { display: none; }
          .ss-cell:nth-child(odd)::after {
            top: 14%; bottom: 14%; right: 0; width: 1px;
          }
          .ss-cell:last-child::after { display: none; }
          .ss-num { font-size: clamp(48px, 5.5vw, 68px); }
          .ss-cell { padding: 52px 24px 48px; }
        }

        @media (min-width: 900px) {
          .ss-cell { padding: 60px 36px 52px; }
        }
      `}</style>

      <div className="ss-grid">
        {STATS.map(({ num, suffix, label, detail, float: isFloat }, i) => (
          <div key={label} className="ss-cell">
            <span className="ss-rule" aria-hidden />
            <span className="ss-num">
              <span
                data-to={num}
                data-suffix={suffix}
                data-float={isFloat ? "1" : "0"}
              >
                {isFloat ? num.toFixed(1) : num}{suffix}
              </span>
            </span>
            <span className="ss-label">{label}</span>
            <span className="ss-detail">{detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
