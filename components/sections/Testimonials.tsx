"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TCARDS = [
  { initial: "C", name: "Camille L.", role: "Coach, Paris",
    quote: "Ça fait sérieux. Vraiment. Tu sens que c'est pensé, écrit, structuré — pas un PDF jeté en deux jours." },
  { initial: "M", name: "Marc D.", role: "Entrepreneur, Lyon",
    quote: "Sobre, précis, et ça respecte le lecteur. La méthode des 3 piliers m'a donné une direction concrète en quelques jours." },
  { initial: "S", name: "Sofia R.", role: "Consultante, Bruxelles",
    quote: "Une vraie progression pédagogique. À la fin de l'ebook j'avais ma direction, pas juste de l'inspiration." },
  { initial: "J", name: "Julien B.", role: "Freelance, Nantes",
    quote: "J'avais peur que ce soit du contenu générique. C'est le contraire — chaque exercice m'a fait réfléchir à ma propre situation." },
  { initial: "A", name: "Amira K.", role: "Manager, Montréal",
    quote: "L'ebook m'a aidé à mettre des mots sur ce que je voulais faire depuis des années. Simple, concret, efficace." },
  { initial: "T", name: "Thomas P.", role: "Ingénieur, Bordeaux",
    quote: "Je suis passé de 'trop d'idées' à une direction claire. La méthode est vraiment bien pensée pour ça." },
  { initial: "L", name: "Laura M.", role: "Photographe, Marseille",
    quote: "Ce n'est pas juste un guide — c'est une vraie démarche de réflexion. Je recommande à quiconque veut se lancer." },
  { initial: "R", name: "Rémi V.", role: "Commercial, Paris",
    quote: "Honnêtement, je ne m'attendais pas à autant. La structure est impeccable et les exercices sont vraiment actionnables." },
  { initial: "I", name: "Inès T.", role: "Étudiante, Toulouse",
    quote: "Parfait pour quelqu'un qui ne sait pas par où commencer. Ça m'a donné la clarté et la confiance pour avancer." },
];

const VISIBLE_DESKTOP = 3;

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [index, setIndex]   = useState(0);
  const [perView, setPerView] = useState(1);

  const maxIndex = TCARDS.length - perView;

  /* Responsive perView */
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 900 ? VISIBLE_DESKTOP : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Clamp index on resize */
  useEffect(() => {
    setIndex((i) => Math.min(i, TCARDS.length - perView));
  }, [perView]);

  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(i, maxIndex)));
  }, [maxIndex]);

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  /* Drag / swipe */
  const dragStart = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => { dragStart.current = e.clientX; };
  const onPointerUp   = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - e.clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    dragStart.current = null;
  };

  /* Reveal on scroll */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const pct = 100 / perView;

  return (
    <section ref={sectionRef} id="temoignages" className="t-section">
      <style>{`
        /* ═══════════════════════════════
           TESTIMONIALS — CARROUSEL
        ═══════════════════════════════ */
        .t-section {
          background: var(--choco-2);
          padding: 88px 0 80px;
          position: relative; overflow: hidden;
        }
        .t-section::before {
          content: '';
          position: absolute; top: 0; left: 10px;
          font-family: var(--serif);
          font-size: clamp(180px, 28vw, 380px);
          line-height: .85;
          color: rgba(233,199,150,.04);
          pointer-events: none; user-select: none;
        }
        .t-orb-1 {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(233,199,150,.06) 0%, transparent 65%);
          top: -100px; right: -60px; filter: blur(80px);
          animation: glow-breathe 10s ease-in-out infinite;
        }
        .t-orb-2 {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(199,165,138,.05) 0%, transparent 65%);
          bottom: -60px; left: 8%; filter: blur(70px);
          animation: glow-breathe 14s ease-in-out infinite 5s;
        }


        /* Header */
        .t-head {
          padding: 0 28px;
          margin-bottom: 48px;
        }

        /* Carrousel wrapper */
        .t-carousel {
          position: relative;
          overflow: hidden;
          cursor: grab;
          user-select: none;
        }
        .t-carousel:active { cursor: grabbing; }

        /* Track */
        .t-track {
          display: flex;
          transition: transform .45s cubic-bezier(.4,0,.2,1);
          will-change: transform;
        }

        /* Carte */
        .tcard {
          flex-shrink: 0;
          padding: 0 8px;
          box-sizing: border-box;
        }
        .tcard-inner {
          background: rgba(246,241,235,.07);
          border: 1px solid rgba(246,241,235,.1);
          border-radius: 20px;
          padding: 32px 28px;
          height: 100%;
          transition: background .3s ease;
        }
        .tcard-inner:hover { background: rgba(246,241,235,.11); }

        .tstars {
          color: var(--gold); font-size: 13px;
          letter-spacing: 3px; margin-bottom: 18px;
        }
        .tquote {
          font-family: var(--serif);
          font-size: 18px; line-height: 1.4;
          letter-spacing: -0.01em;
          color: rgba(246,241,235,.92);
          margin-bottom: 24px;
        }
        .twho {
          display: flex; align-items: center; gap: 12px;
          padding-top: 18px;
          border-top: 1px solid rgba(246,241,235,.1);
        }
        .tavatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(201,148,58,.22), rgba(233,199,150,.1));
          border: 1px solid rgba(201,148,58,.28);
          color: var(--nude);
          display: grid; place-items: center;
          font-family: var(--serif); font-style: italic; font-size: 15px;
          flex-shrink: 0;
        }
        .tname { font-size: 13.5px; font-weight: 500; color: rgba(246,241,235,.9); }
        .trole {
          font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(246,241,235,.38); margin-top: 2px;
        }

        /* Navigation */
        .t-nav {
          display: flex; align-items: center; justify-content: center; gap: 16px;
          padding: 36px 28px 0;
        }
        .t-btn {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(246,241,235,.2);
          background: rgba(246,241,235,.06);
          color: rgba(246,241,235,.7);
          display: grid; place-items: center;
          cursor: pointer; transition: background .2s ease, border-color .2s ease, color .2s ease;
          flex-shrink: 0;
        }
        .t-btn:hover:not(:disabled) {
          background: rgba(246,241,235,.14);
          border-color: rgba(246,241,235,.4);
          color: #fff;
        }
        .t-btn:disabled { opacity: .3; cursor: default; }

        /* Dots */
        .t-dots {
          display: flex; align-items: center; gap: 6px;
        }
        .t-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(246,241,235,.25);
          border: none; cursor: pointer; padding: 0;
          transition: background .25s ease, transform .25s ease, width .25s ease;
        }
        .t-dot.active {
          background: var(--gold);
          width: 22px; border-radius: 999px;
        }

        /* CTA */
        .tcta-wrap {
          margin-top: 56px; text-align: center;
          padding: 40px 28px 0;
          border-top: 1px solid rgba(246,241,235,.1);
        }
        .tcta-title {
          font-family: var(--serif); font-style: italic;
          font-size: clamp(18px, 3vw, 22px);
          color: rgba(246,241,235,.65); margin-bottom: 24px;
        }
        .tcta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          min-height: 56px; padding: 0 32px;
          background: var(--bg); color: var(--choco-2);
          border-radius: 999px;
          font-size: 14px; font-weight: 600; letter-spacing: 0.02em;
          box-shadow: 0 14px 32px -12px rgba(246,241,235,.15);
          transition: transform .25s ease, box-shadow .35s ease, background .2s ease;
          position: relative; overflow: hidden;
        }
        .tcta-btn::before {
          content: '';
          position: absolute; top: 0; left: 0; width: 60%; height: 100%;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,.2) 50%, transparent 70%);
          transform: translateX(-120%) skewX(-15deg); pointer-events: none;
        }
        .tcta-btn:hover { background: #fff; transform: translateY(-2px); }
        .tcta-btn:hover::before { animation: shimmer-pass .6s ease forwards; }
        .tcta-note {
          margin-top: 14px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(246,241,235,.28);
        }

        /* Desktop : padding latéral sur le carrousel */
        @media (min-width: 900px) {
          .t-section { padding: 120px 0 100px; }
          .t-head { padding: 0 80px; }
          .t-carousel { padding: 0 64px; }
          .tcard { padding: 0 10px; }
          .tcard-inner { padding: 40px 32px; }
          .tquote { font-size: 20px; }
          .t-nav { padding: 40px 80px 0; justify-content: flex-start; gap: 12px; }
          .tcta-wrap { padding: 48px 80px 0; }
        }
        @media (min-width: 1200px) {
          .t-head { padding: 0 100px; }
          .t-carousel { padding: 0 88px; }
          .t-nav { padding: 40px 100px 0; }
          .tcta-wrap { padding: 48px 100px 0; }
        }
      `}</style>

      <div className="t-orb-1" aria-hidden />
      <div className="t-orb-2" aria-hidden />

      {/* Header */}
      <div className="t-head reveal">
        <span className="eyebrow" style={{ color: "var(--nude-2)" }}>
          <span className="rule" style={{ background: "var(--nude-2)", opacity: .6 }} />Ils l&apos;ont lu
        </span>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px,7vw,50px)", lineHeight: 1.06, letterSpacing: "-0.025em", marginTop: 16, color: "rgba(246,241,235,.95)", textWrap: "balance" }}>
          Une lecture qui <em style={{ fontStyle: "italic", color: "var(--nude)" }}>change le regard</em>.
        </h2>
      </div>

      {/* Carrousel */}
      <div
        className="t-carousel reveal"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          ref={trackRef}
          className="t-track"
          style={{ transform: `translateX(-${index * pct}%)` }}
        >
          {TCARDS.map(({ initial, name, role, quote }) => (
            <div
              key={name}
              className="tcard"
              style={{ width: `${pct}%` }}
            >
              <article className="tcard-inner">
                <div className="tstars">★★★★★</div>
                <p className="tquote">"{quote}"</p>
                <div className="twho">
                  <span className="tavatar">{initial}</span>
                  <div>
                    <div className="tname">{name}</div>
                    <div className="trole">{role}</div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="t-nav">
        <button className="t-btn" onClick={prev} disabled={index === 0} aria-label="Précédent">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 2L4 7l5 5"/>
          </svg>
        </button>

        <div className="t-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`t-dot${i === index ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Aller au groupe ${i + 1}`}
            />
          ))}
        </div>

        <button className="t-btn" onClick={next} disabled={index >= maxIndex} aria-label="Suivant">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 2l5 5-5 5"/>
          </svg>
        </button>
      </div>

      {/* CTA */}
      <div className="tcta-wrap reveal">
        <p className="tcta-title">Prêt·e à rejoindre les 500+ lecteurs ?</p>
        <a href="#acheter" className="tcta-btn">
          Oui, je suis prêt·e à les rejoindre
        </a>
      </div>
    </section>
  );
}
