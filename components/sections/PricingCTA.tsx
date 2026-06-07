"use client";

import { useEffect, useRef, useState } from "react";

export function PricingCTA() {
  const ref = useRef<HTMLElement>(null);
  const [prenom, setPrenom] = useState("");
  const [email, setEmail]   = useState("");
  const [sent, setSent]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prenom.trim() || !email.trim()) return;
    setSent(true);
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.07, rootMargin: "0px 0px -4% 0px" }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-scale").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current?.querySelector(".px-counter") as HTMLElement | null;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = (ease * 29.12).toFixed(2).replace(".", ",");
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = "29,12";
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="acheter" className="section-base px-section">
      <style>{`
        .px-section {
          background: var(--choco-2);
          position: relative; overflow: hidden;
        }

        /* Orbs */
        .px-orb-1 {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(233,199,150,.07) 0%, transparent 60%);
          top: -280px; left: -260px; filter: blur(110px);
          animation: glow-breathe 11s ease-in-out infinite;
        }
        .px-orb-2 {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(199,165,138,.06) 0%, transparent 60%);
          bottom: -160px; right: -120px; filter: blur(90px);
          animation: glow-breathe 15s ease-in-out infinite 6s;
        }

        /* Watermark */
        .px-mark {
          position: absolute;
          bottom: -60px; right: -20px;
          font-family: var(--serif); font-style: italic;
          font-size: clamp(160px, 28vw, 320px); line-height: 1;
          color: rgba(233,199,150,.028);
          pointer-events: none; user-select: none;
          letter-spacing: -0.06em;
        }

        .px-inner {
          position: relative; z-index: 1;
          max-width: 820px; margin: 0 auto;
          text-align: center;
        }

        /* Eyebrow with ornamental lines */
        .px-eyebrow {
          display: flex; align-items: center; justify-content: center; gap: 18px;
          font-size: 10px; letter-spacing: 0.36em; text-transform: uppercase;
          color: var(--nude-2); margin-bottom: 52px;
        }
        .px-eyebrow::before, .px-eyebrow::after {
          content: '';
          flex: 1; max-width: 72px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(199,165,138,.38));
        }
        .px-eyebrow::after {
          background: linear-gradient(270deg, transparent, rgba(199,165,138,.38));
        }

        /* Headline */
        .px-h2 {
          font-family: var(--serif); font-style: italic;
          font-size: clamp(46px, 9vw, 84px);
          line-height: 0.96; letter-spacing: -0.03em;
          color: rgba(246,241,235,.97);
          margin-bottom: 20px;
        }
        .px-h2 em { color: var(--nude); }

        .px-sub {
          font-size: 15px; line-height: 1.7;
          color: rgba(246,241,235,.45);
          max-width: 44ch; margin: 0 auto 60px;
        }

        /* Price ruler — centerpiece */
        .px-ruler {
          display: flex; align-items: center; gap: 0;
          margin-bottom: 52px;
        }
        .px-ruler-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(199,165,138,.2) 100%);
        }
        .px-ruler-line.r {
          background: linear-gradient(270deg, transparent 0%, rgba(199,165,138,.2) 100%);
        }
        .px-ruler-price {
          padding: 0 36px;
          display: flex; flex-direction: column; align-items: center;
        }
        .px-strike {
          font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(246,241,235,.22); text-decoration: line-through;
          margin-bottom: 6px;
        }
        .px-price-row {
          display: flex; align-items: flex-start; gap: 4px; line-height: 1;
        }
        .px-cur {
          font-family: var(--serif); font-size: 22px;
          color: var(--nude-2); padding-top: 10px;
        }
        .px-num {
          font-family: var(--serif); font-size: clamp(72px, 15vw, 104px);
          letter-spacing: -0.045em;
          color: var(--bg);
          filter: drop-shadow(0 0 28px rgba(233,199,150,.16));
          line-height: 1;
        }
        .px-period {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(246,241,235,.28); margin-top: 8px;
        }

        /* Launch badge */
        .px-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 18px;
          background: rgba(233,199,150,.07);
          border: 1px solid rgba(233,199,150,.18);
          border-radius: 999px;
          font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--nude); margin-bottom: 36px;
        }
        .px-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--nude);
          box-shadow: 0 0 0 0 rgba(233,199,150,.5);
          animation: pulse 1.8s infinite; flex-shrink: 0;
        }

        /* CTA button */
        .px-btn {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          width: 100%; max-width: 480px; margin: 0 auto 14px;
          min-height: 68px; padding: 0 32px;
          background: var(--bg); color: var(--choco-2);
          border-radius: 999px;
          font-size: 15.5px; font-weight: 600; letter-spacing: 0.015em;
          box-shadow:
            0 24px 64px -20px rgba(246,241,235,.28),
            0 0 0 1px rgba(246,241,235,.05);
          transition: transform .3s cubic-bezier(.23,1,.32,1), box-shadow .4s ease, background .2s ease;
          position: relative; overflow: hidden;
        }
        .px-btn::before {
          content: '';
          position: absolute; top: 0; left: 0; width: 60%; height: 100%;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,.24) 50%, transparent 70%);
          transform: translateX(-120%) skewX(-15deg); pointer-events: none;
        }
        .px-btn:hover { background: #fff; transform: translateY(-4px); box-shadow: 0 36px 88px -24px rgba(246,241,235,.45); }
        .px-btn:hover::before { animation: shimmer-pass .55s ease forwards; }
        .px-btn-ico {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--choco-2); color: var(--bg);
          display: grid; place-items: center; flex-shrink: 0;
          transition: transform .3s cubic-bezier(.23,1,.32,1);
        }
        .px-btn:hover .px-btn-ico { transform: translateX(5px); }

        .px-note {
          font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(246,241,235,.25); margin-bottom: 52px;
        }

        /* Value list */
        .px-values {
          display: flex; flex-direction: column; gap: 0;
          max-width: 420px; margin: 0 auto 52px;
          text-align: left;
          border: 1px solid rgba(246,241,235,.08);
          border-radius: 18px; overflow: hidden;
        }
        .px-val {
          display: flex; align-items: center; gap: 14px;
          padding: 15px 22px;
          border-bottom: 1px solid rgba(246,241,235,.06);
          font-size: 13.5px; color: rgba(246,241,235,.6); line-height: 1.4;
          transition: background .25s ease;
        }
        .px-val:last-child { border-bottom: none; }
        .px-val:hover { background: rgba(246,241,235,.04); }
        .px-val-ico {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          background: rgba(233,199,150,.1); border: 1px solid rgba(233,199,150,.22);
          display: grid; place-items: center; color: var(--nude);
        }

        /* ── Formulaire ── */
        .px-form {
          width: 100%; max-width: 480px; margin: 0 auto 14px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .px-field { display: flex; flex-direction: column; gap: 6px; text-align: left; }
        .px-label {
          font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
          color: rgba(246,241,235,.4); padding-left: 4px;
        }
        .px-input {
          width: 100%; height: 52px; padding: 0 18px;
          background: rgba(246,241,235,.07);
          border: 1px solid rgba(246,241,235,.14);
          border-radius: 12px;
          font-size: 14.5px; color: rgba(246,241,235,.92);
          font-family: var(--sans);
          outline: none;
          transition: border-color .25s ease, background .25s ease, box-shadow .25s ease;
        }
        .px-input::placeholder { color: rgba(246,241,235,.25); }
        .px-input:focus {
          border-color: rgba(233,199,150,.45);
          background: rgba(246,241,235,.1);
          box-shadow: 0 0 0 3px rgba(233,199,150,.08);
        }

        /* Bouton submit */
        .px-submit {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          width: 100%; min-height: 60px; margin-top: 4px;
          padding: 0 28px;
          background: var(--bg); color: var(--choco-2);
          border: none; border-radius: 999px; cursor: pointer;
          font-size: 15px; font-weight: 600; letter-spacing: 0.015em;
          font-family: var(--sans);
          box-shadow: 0 24px 64px -20px rgba(246,241,235,.28), 0 0 0 1px rgba(246,241,235,.05);
          transition: transform .3s cubic-bezier(.23,1,.32,1), box-shadow .4s ease, background .2s ease;
          position: relative; overflow: hidden;
        }
        .px-submit::before {
          content: '';
          position: absolute; top: 0; left: 0; width: 60%; height: 100%;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,.24) 50%, transparent 70%);
          transform: translateX(-120%) skewX(-15deg); pointer-events: none;
        }
        .px-submit:hover { background: #fff; transform: translateY(-3px); box-shadow: 0 36px 88px -24px rgba(246,241,235,.45); }
        .px-submit:hover::before { animation: shimmer-pass .55s ease forwards; }
        .px-submit-ico {
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--choco-2); color: var(--bg);
          display: grid; place-items: center; flex-shrink: 0;
          transition: transform .3s cubic-bezier(.23,1,.32,1);
        }
        .px-submit:hover .px-submit-ico { transform: translateX(4px); }

        /* État succès */
        .px-success {
          width: 100%; max-width: 480px; margin: 0 auto 14px;
          padding: 32px 24px;
          background: rgba(233,199,150,.08);
          border: 1px solid rgba(233,199,150,.22);
          border-radius: 20px; text-align: center;
        }
        .px-success-icon {
          width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 16px;
          background: rgba(233,199,150,.15);
          border: 1px solid rgba(233,199,150,.3);
          display: grid; place-items: center; color: var(--nude);
        }
        .px-success h4 {
          font-family: var(--serif); font-style: italic;
          font-size: 20px; color: rgba(246,241,235,.92);
          margin-bottom: 8px;
        }
        .px-success p {
          font-size: 13px; color: rgba(246,241,235,.45);
          line-height: 1.6;
        }

        /* Trust row */
        .px-trust {
          display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;
          font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(246,241,235,.28);
        }
        .px-trust span { display: inline-flex; align-items: center; gap: 7px; }

        @media (min-width: 900px) {
          .px-h2 { font-size: clamp(60px, 7vw, 84px); }
          .px-values { flex-direction: row; max-width: 680px; border-radius: 14px; }
          .px-val { flex-direction: column; align-items: flex-start; flex: 1; border-bottom: none; border-right: 1px solid rgba(246,241,235,.06); }
          .px-val:last-child { border-right: none; }
        }
      `}</style>

      <div className="px-orb-1" aria-hidden />
      <div className="px-orb-2" aria-hidden />
      <div className="px-mark" aria-hidden>€</div>

      <div className="px-inner">
        <div className="px-eyebrow reveal">Ton investissement</div>

        <h2 className="px-h2 reveal" data-d="1">
          Prêt·e à bâtir<br />
          <em>ce qui te ressemble ?</em>
        </h2>

        <a href="#acheter" className="px-btn reveal" data-d="2">
          Je passe à l&apos;action — 29,12 €
          <span className="px-btn-ico" aria-hidden>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 6.5h9M7 2.5l4 4-4 4" />
            </svg>
          </span>
        </a>

      </div>
    </section>
  );
}
