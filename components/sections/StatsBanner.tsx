"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const STATS = [
  { num: "500+",  label: "Lecteurs accompagnés",       detail: "et toujours plus" },
  { num: "4,9/5", label: "Satisfaction moyenne",        detail: "sur 5 étoiles" },
  { num: "70+",   label: "Pages de méthode",            detail: "actionnables" },
  { num: "30j",   label: "Pour voir les résultats",     detail: "dès les premières pages" },
  { num: "3",     label: "Piliers de transformation",   detail: "structurés et progressifs" },
  { num: "97%",   label: "Recommandent l'ebook",        detail: "à leur entourage" },
];

const PER_VIEW_MOBILE = 2;

export function StatsBanner() {
  const ref   = useRef<HTMLDivElement>(null);
  const [index, setIndex]   = useState(0);
  const [mobile, setMobile] = useState(false);
  const dragStart = useRef<number | null>(null);
  const [counted, setCounted] = useState(false);

  const maxIndex = Math.ceil(STATS.length / PER_VIEW_MOBILE) - 1;

  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = useCallback((i: number) =>
    setIndex(Math.max(0, Math.min(i, maxIndex))), [maxIndex]);

  const onPointerDown = (e: React.PointerEvent) => { if (mobile) dragStart.current = e.clientX; };
  const onPointerUp   = (e: React.PointerEvent) => {
    if (!mobile || dragStart.current === null) return;
    const diff = dragStart.current - e.clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goTo(index + 1) : goTo(index - 1);
    dragStart.current = null;
  };

  /* Count-up animation */
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || counted) return;
      setCounted(true);
      io.disconnect();
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [counted]);

  return (
    <div ref={ref} className="sb-section">
      <style>{`
        .sb-section {
          background: var(--bg-2);
          position: relative; overflow: hidden;
          padding: 0;
        }

        /* ── MOBILE : carrousel 2 par vue ── */
        .sb-carousel {
          overflow: hidden;
          cursor: grab;
          user-select: none;
        }
        .sb-carousel:active { cursor: grabbing; }

        .sb-track {
          display: flex;
          transition: transform .42s cubic-bezier(.4,0,.2,1);
          will-change: transform;
        }

        .sb-slide {
          flex-shrink: 0;
          width: 50%; /* 2 visible à la fois */
          padding: 36px 20px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
          position: relative;
        }

        /* séparateur vertical entre slides */
        .sb-slide:not(:last-child)::after {
          content: '';
          position: absolute; top: 20%; bottom: 20%; right: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--line) 40%, var(--line) 60%, transparent);
        }

        .sb-rule {
          width: 20px; height: 1px;
          background: var(--gold); opacity: .7;
          margin-bottom: 14px;
          transform: scaleX(0); transform-origin: left;
          transition: transform .55s cubic-bezier(.16,1,.3,1);
        }
        .sb-section.ready .sb-rule { transform: scaleX(1); }

        .sb-num {
          font-family: var(--serif); font-style: italic;
          font-size: clamp(36px, 8vw, 52px);
          line-height: 1; letter-spacing: -0.03em;
          color: var(--choco-2); margin-bottom: 8px;
        }
        .sb-label {
          font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--ink-soft); margin-bottom: 4px;
        }
        .sb-detail {
          font-family: var(--serif); font-style: italic;
          font-size: 11.5px; color: var(--ink-light);
        }

        /* Dots */
        .sb-dots {
          display: flex; justify-content: center; gap: 6px;
          padding: 4px 0 20px;
        }
        .sb-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--line);
          border: none; cursor: pointer; padding: 0;
          transition: background .25s ease, width .25s ease;
        }
        .sb-dot.active {
          background: var(--gold);
          width: 20px; border-radius: 999px;
        }

        /* ── DESKTOP : tous visibles en ligne ── */
        @media (min-width: 640px) {
          .sb-carousel { cursor: default; overflow: visible; }
          .sb-track {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            transform: none !important;
          }
          .sb-slide {
            width: auto;
            padding: 52px 16px;
          }
          .sb-dots { display: none; }
          .sb-num { font-size: clamp(38px, 4vw, 56px); }
        }

        @media (min-width: 900px) {
          .sb-slide { padding: 60px 24px; }
        }
      `}</style>

      <div
        className="sb-carousel"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="sb-track"
          style={mobile ? { transform: `translateX(-${index * 100}%)` } : undefined}
        >
          {STATS.map(({ num, label, detail }, i) => (
            <div key={label} className="sb-slide">
              <span className="sb-rule" style={{ transitionDelay: `${i * 0.07}s` }} aria-hidden />
              <span className="sb-num">{num}</span>
              <span className="sb-label">{label}</span>
              <span className="sb-detail">{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dots — mobile seulement */}
      {mobile && (
        <div className="sb-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`sb-dot${i === index ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Groupe ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
