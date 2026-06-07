"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CARDS = [
  {
    num: "01",
    title: "Reconstruction mentale",
    desc: "Désactive les croyances qui te freinent. Reconstruis un mental d'entrepreneuse — calme, ambitieux, décidé.",
    svg: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M13 3c-3.8 0-6.5 2.8-6.5 6 0 1.9 1 3.3 1 4.6v4.7c0 1.4 1 2.3 2.3 2.3h6.4c1.4 0 2.3-.9 2.3-2.3v-4.7c0-1.3 1-2.7 1-4.6C19.5 5.8 16.8 3 13 3z"/>
        <path d="M10 13c1 1.4 1.8 1.9 3 1.9s2-.5 3-1.9"/>
        <circle cx="10.8" cy="10.2" r=".65" fill="currentColor"/>
        <circle cx="15.2" cy="10.2" r=".65" fill="currentColor"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Bâtir à partir de toi",
    desc: "Trouve l'idée juste — celle qui sort de ta nature, de ton vécu, de tes talents — et transforme-la en projet solide.",
    svg: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M13 3v20"/>
        <path d="M5 10.5l8-5 8 5"/>
        <path d="M5 10.5v9h16v-9"/>
        <path d="M9.5 19.5v-4h7v4"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Accélérer par ton environnement",
    desc: "Construis le cercle, les habitudes et le quotidien qui rendent ton succès inévitable. L'environnement gagne toujours.",
    svg: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="13" cy="13" r="8.5"/>
        <circle cx="13" cy="8.5" r="1.8"/>
        <circle cx="8.5" cy="15.8" r="1.8"/>
        <circle cx="17.5" cy="15.8" r="1.8"/>
        <path d="M13 10.3l-2.8 3.7M13 10.3l2.8 3.7M10.3 15.8h5.4"/>
      </svg>
    ),
  },
];

export function Strategies() {
  const ref      = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = useCallback((i: number) =>
    setIndex(Math.max(0, Math.min(i, CARDS.length - 1))), []);

  const onPointerDown = (e: React.PointerEvent) => { if (isMobile) dragStart.current = e.clientX; };
  const onPointerUp   = (e: React.PointerEvent) => {
    if (!isMobile || dragStart.current === null) return;
    const diff = dragStart.current - e.clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goTo(index + 1) : goTo(index - 1);
    dragStart.current = null;
  };

  /* reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* hover glow desktop */
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(ref.current?.querySelectorAll(".strat-card") ?? []) as HTMLElement[];
    const cleanups: (() => void)[] = [];
    cards.forEach((card) => {
      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        card.style.background = `radial-gradient(circle 220px at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(233,199,150,.1), rgba(246,241,235,.07) 65%)`;
      };
      const onLeave = () => { card.style.background = ""; };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      cleanups.push(() => { card.removeEventListener("pointermove", onMove); card.removeEventListener("pointerleave", onLeave); });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={ref} id="contenu" className="section-base" style={{ background: "var(--choco-2)", position: "relative", overflow: "hidden" }}>
      <style>{`
        /* ── CARROUSEL MOBILE ── */
        .strat-carousel {
          overflow: hidden;
          margin-top: 52px;
          cursor: grab;
          user-select: none;
        }
        .strat-carousel:active { cursor: grabbing; }
        .strat-track {
          display: flex;
          transition: transform .42s cubic-bezier(.4,0,.2,1);
          will-change: transform;
        }
        .strat-slide {
          flex-shrink: 0;
          width: 100%;
          padding: 0 4px;
          box-sizing: border-box;
        }

        /* Dots */
        .strat-dots {
          display: flex; justify-content: center; gap: 6px;
          margin-top: 20px;
        }
        .strat-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(246,241,235,.22);
          border: none; cursor: pointer; padding: 0;
          transition: background .25s ease, width .25s ease;
        }
        .strat-dot.active {
          background: var(--gold);
          width: 22px; border-radius: 999px;
        }

        /* ── CARD ── */
        .strat-card {
          background: rgba(246,241,235,.07);
          border: 1px solid rgba(246,241,235,.1);
          border-radius: 20px;
          padding: 32px 28px 28px;
          display: flex; flex-direction: column;
          transition: background .3s ease, transform .35s ease;
          height: 100%;
        }
        .strat-card:hover {
          background: rgba(246,241,235,.11);
          transform: translateY(-3px);
        }
        .strat-card-top {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 24px;
        }
        .strat-num {
          font-family: var(--serif); font-style: italic;
          font-size: 13px; color: var(--nude-2);
          letter-spacing: 0.02em; padding-top: 2px;
        }
        .strat-ico {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, rgba(199,165,138,.18), rgba(233,199,150,.1)) !important;
          border: 1px solid rgba(233,199,150,.16) !important;
          display: grid; place-items: center;
          color: var(--nude); flex-shrink: 0;
          transition: border-color .25s ease, color .25s ease !important;
        }
        .strat-card:hover .strat-ico {
          border-color: rgba(233,199,150,.36) !important;
          color: var(--gold) !important;
        }
        .strat-card h3 {
          font-family: var(--serif);
          font-size: 22px; line-height: 1.2;
          letter-spacing: -0.02em;
          color: rgba(246,241,235,.95); margin-bottom: 12px;
        }
        .strat-card p {
          font-size: 14.5px; line-height: 1.65;
          color: rgba(246,241,235,.55); flex: 1;
        }
        .strat-deco-n {
          position: absolute; right: -4px; bottom: -22px;
          font-family: var(--serif); font-style: italic;
          font-size: 130px; line-height: 1;
          color: rgba(246,241,235,.034);
          pointer-events: none; user-select: none; letter-spacing: -0.04em;
        }
        .strat-orb-1 {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(233,199,150,.07) 0%, transparent 65%);
          top: -160px; left: -140px; filter: blur(80px);
          animation: glow-breathe 9s ease-in-out infinite;
        }
        .strat-orb-2 {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(199,165,138,.05) 0%, transparent 65%);
          bottom: -80px; right: -60px; filter: blur(70px);
          animation: glow-breathe 13s ease-in-out infinite 4s;
        }

        .strat-cta-wrap { text-align: center; margin-top: 48px; }
        .strat-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          min-height: 52px; padding: 0 30px;
          background: rgba(246,241,235,.09);
          border: 1px solid rgba(246,241,235,.18);
          color: rgba(246,241,235,.85);
          border-radius: 999px;
          font-size: 13.5px; font-weight: 500; letter-spacing: 0.03em;
          transition: background .2s ease, border-color .2s ease, transform .25s ease;
        }
        .strat-cta-btn:hover {
          background: rgba(246,241,235,.15);
          border-color: rgba(246,241,235,.3);
          transform: translateY(-2px);
        }
        .strat-cta-btn svg { transition: transform .25s ease; }
        .strat-cta-btn:hover svg { transform: translateX(3px); }

        /* ── DESKTOP — grille 3 colonnes ── */
        @media (min-width: 900px) {
          .strat-carousel { cursor: default; }
          .strat-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            transform: none !important;
          }
          .strat-slide { width: auto; padding: 0; }
          .strat-dots  { display: none; }
          .strat-card  { padding: 40px 32px 32px; }
          .strat-card h3 { font-size: 24px; }
        }
      `}</style>

      <div className="strat-orb-1" aria-hidden />
      <div className="strat-orb-2" aria-hidden />

      <div className="sec-head reveal" style={{ marginBottom: 0 }}>
        <span className="eyebrow" style={{ color: "var(--nude-2)" }}>
          <span className="rule" style={{ background: "var(--nude-2)", opacity: .6 }} />La méthode
        </span>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px,7vw,50px)", lineHeight: 1.06, letterSpacing: "-0.025em", marginTop: 16, color: "rgba(246,241,235,.95)", textWrap: "balance" }}>
          Trois piliers pour <em style={{ fontStyle: "italic", color: "var(--nude)" }}>bâtir ton succès</em>.
        </h2>
      </div>

      {/* Carrousel mobile / grille desktop */}
      <div
        className="strat-carousel"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="strat-track"
          style={isMobile ? { transform: `translateX(-${index * 100}%)` } : undefined}
        >
          {CARDS.map(({ num, title, desc, svg }, i) => (
            <div key={num} className="strat-slide">
              <article className="strat-card reveal" data-d={String(i + 1)} style={{ position: "relative" }}>
                <span className="strat-deco-n" aria-hidden>{num}</span>
                <div className="strat-card-top">
                  <span className="strat-num">Pilier {num}</span>
                  <div className="strat-ico">{svg}</div>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Dots mobile */}
      <div className="strat-dots">
        {CARDS.map((_, i) => (
          <button
            key={i}
            className={`strat-dot${i === index ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Pilier ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
