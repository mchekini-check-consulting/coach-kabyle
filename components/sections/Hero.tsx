"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  /* ── GSAP entrance timeline ── */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* 1. Image fond : légère montée + révélation */
      tl.from(".h-bg", {
        opacity: 0,
        scale: 1.06,
        duration: 1.6,
        ease: "power2.out",
      }, 0);

      /* 2. Overlay */
      tl.from(".h-overlay", {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      }, 0.1);

      /* 3. Lignes du titre — stagger vers le haut */
      tl.from(".h-line, .h-line-em", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      }, 0.3);

      /* 4. Sous-titre */
      tl.from(".h-sub", {
        opacity: 0,
        y: 24,
        duration: 0.9,
      }, 0.7);

      /* 5. Avantages */
      tl.from(".h-perk", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.09,
      }, 0.9);

      /* 6. Bouton CTA — légère élasticité */
      tl.from(".h-btn-main", {
        opacity: 0,
        y: 18,
        scale: 0.95,
        duration: 0.7,
        ease: "back.out(1.6)",
      }, 1.05);

      /* 7. Scroll cue */
      tl.from(".h-cue", {
        opacity: 0,
        duration: 0.6,
      }, 1.4);

    }, wrapRef);

    return () => ctx.revert();
  }, []);

  /* counters */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const configs = [
      { sel: ".hs1 b", to: 70, suffix: "+" },
      { sel: ".hs2 b", to: 3,  suffix: "" },
      { sel: ".hs3 b", to: 30, suffix: "j" },
    ];
    const t = setTimeout(() => {
      configs.forEach(({ sel, to, suffix }, i) => {
        const el = wrapRef.current?.querySelector(sel) as HTMLElement | null;
        if (!el) return;
        const dur = 1200; const s = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - s) / dur, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        setTimeout(() => requestAnimationFrame(tick), 200 + i * 70);
      });
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={wrapRef} className="hero" aria-label="Introduction">
      <style>{`

        /* ══════════════════════════════════════════════════════
           HERO — image plein fond, fond assorti, texte à gauche
        ══════════════════════════════════════════════════════ */

        .hero {
          position: relative;
          height: 100dvh;
          overflow: hidden;
          /* Fond = couleur exacte du bord de l'image */
          background: #EAE5DE;
        }

        /* ── IMAGE plein fond ── */
        .h-bg {
          position: absolute; inset: 0; z-index: 0;
        }
        .h-bg img {
          filter: contrast(1.04) saturate(.9) brightness(1.01);
          /* Mobile portrait : focus sur le personnage (centre-droit de l'image) */
          object-position: 15% center;
        }

        /* ── OVERLAY mobile : dégradé bas crème → transparent ──
           Permet de lire le texte positionné en bas              */
        .h-overlay {
          position: absolute; inset: 0; z-index: 1;
          /* Mobile : voile centré pour lisibilité du texte au milieu */
          background: linear-gradient(
            to bottom,
            transparent              0%,
            rgba(234,229,222,.55)   20%,
            rgba(234,229,222,.82)   40%,
            rgba(234,229,222,.88)   60%,
            rgba(234,229,222,.55)   80%,
            transparent             100%
          );
        }

        /* ── CONTENU mobile : centré verticalement ── */
        .h-body {
          position: absolute; z-index: 2;
          top: 50%; left: 0; right: 0;
          transform: translateY(-50%);
          padding: 0 20px;
          text-align: left;
        }


        /* Badge */
        .h-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 14px 7px 10px;
          background: rgba(250,250,247,.82);
          border: 1px solid rgba(201,148,58,.28);
          border-radius: 999px;
          font-size: 11.5px; color: var(--choco-2);
          letter-spacing: 0.02em; margin-bottom: 18px;
          box-shadow: 0 2px 10px rgba(43,26,18,.07);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
        }
        .h-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0;
          animation: pulse 2s infinite;
        }

        /* Eyebrow */
        .h-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; letter-spacing: 0.36em; text-transform: uppercase;
          color: var(--nude-3); font-weight: 500; margin-bottom: 14px;
        }
        .h-eyebrow::before {
          content: ''; width: 18px; height: 1px;
          background: var(--gold); opacity: .7; flex-shrink: 0;
        }

        /* Titre — aligné gauche, taille cohérente */
        .h-headline {
          font-family: var(--serif);
          line-height: 1.0; letter-spacing: -0.035em;
          margin-bottom: 18px;
          text-align: left;
        }
        .h-line {
          display: block;
          font-size: clamp(52px, 13vw, 72px);
          color: var(--choco-2); font-weight: 700;
        }
        .h-line-em {
          display: block;
          font-size: clamp(52px, 13vw, 72px);
          font-style: italic; font-weight: 400;
          color: var(--nude-3); margin-top: 4px;
        }

        /* Sous-titre — même alignement gauche que le titre */
        .h-sub {
          font-size: 17px; line-height: 1.6;
          color: var(--ink);
          max-width: 100%;
          margin-bottom: 28px;
          font-weight: 400;
          text-align: left;
        }

        /* Avantages */
        .h-perks {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 16px;
          margin-bottom: 28px;
        }
        .h-perk {
          display: flex; align-items: center; gap: 9px;
          font-size: 13.5px; font-weight: 500;
          color: var(--choco-2); line-height: 1.3;
        }
        .h-perk-ico {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          display: grid; place-items: center;
        }

        /* Actions */
        .h-actions {
          display: flex; flex-direction: column; gap: 9px;
          margin-bottom: 28px;
        }
        .h-btn-main {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          min-height: 56px; padding: 0 26px; border-radius: 999px;
          background: var(--choco-2); color: var(--bg);
          font-size: 14px; font-weight: 600; letter-spacing: 0.02em;
          box-shadow: 0 14px 32px -12px rgba(43,26,18,.5);
          transition: transform .25s ease, box-shadow .35s ease, background .2s ease;
          position: relative; overflow: hidden;
        }
        .h-btn-main::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,.1) 50%, transparent 70%);
          transform: translateX(-130%) skewX(-15deg); pointer-events: none;
        }
        .h-btn-main:hover {
          background: var(--ink); transform: translateY(-2px);
          box-shadow: 0 22px 48px -14px rgba(43,26,18,.65), 0 0 0 4px var(--gold-glow);
        }
        .h-btn-main:hover::before { animation: shimmer-pass .55s ease forwards; }
        .h-btn-ico {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(250,250,247,.15); color: var(--bg);
          display: grid; place-items: center; flex-shrink: 0;
          transition: transform .3s cubic-bezier(.23,1,.32,1);
        }
        .h-btn-main:hover .h-btn-ico { transform: translateX(4px); }


        /* Stats */
        .h-stats {
          display: flex;
          border-top: 1px solid var(--line-2);
          padding-top: 18px;
        }
        .h-stat { flex: 1; }
        .h-stat + .h-stat { padding-left: 20px; border-left: 1px solid var(--line-2); }
        .h-stat b {
          display: block; font-family: var(--serif); font-style: italic;
          font-size: 28px; line-height: 1; letter-spacing: -0.02em;
          color: var(--choco-2); margin-bottom: 4px;
        }
        .h-stat span {
          font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--ink-light);
        }

        /* Scroll cue */
        .h-cue {
          position: absolute; bottom: 44px; right: 28px; z-index: 3;
          display: none;
          flex-direction: column; align-items: center; gap: 8px;
          font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase;
          color: var(--ink-light); writing-mode: vertical-lr; pointer-events: none;
        }
        .h-cue-line {
          width: 1px; height: 36px; background: var(--line);
          animation: cue-line 1.8s ease-in-out infinite;
          transform-origin: top;
        }
        @keyframes cue-line {
          0%,100% { transform: scaleY(.35); opacity: .4; }
          50%      { transform: scaleY(1);   opacity: 1; }
        }


        /* ══════════════════════════════════════════════
           DESKTOP — texte à gauche, image centrée droite
           Overlay passe en dégradé gauche → transparent
        ══════════════════════════════════════════════ */
        @media (min-width: 900px) {

          /* Desktop large : image wide s'affiche bien en centré */
          .h-bg img { object-position: center center !important; }

          /* Pas d'overlay côté desktop — le fond #E8E3DC est naturellement
             présent là où l'image (contain) ne couvre pas */
          .h-overlay { display: none; }

          /* Contenu desktop : zone large, padding réduit */
          .h-body {
            top: 50%; transform: translateY(-50%);
            left: 0; right: auto; width: 62%;
            padding: 0 56px;
            text-align: left;
          }

          .h-line    { font-size: clamp(52px, 4.8vw, 82px); }
          .h-line-em { font-size: clamp(52px, 4.8vw, 82px); }
          .h-sub     { font-size: 16px; max-width: none; }
          .h-actions { flex-direction: row; align-items: center; }

          .h-cue { display: flex; }
        }

        @media (min-width: 1200px) {
          .h-body  { padding: 0 72px; width: 60%; }
          .h-line    { font-size: clamp(60px, 5vw, 96px); }
          .h-line-em { font-size: clamp(60px, 5vw, 96px); }
        }

        /* Tablette portrait/paysage : focus personnage */
        @media (min-width: 600px) and (max-width: 899px) {
          .h-bg img { object-position: 58% center !important; }
        }

        @media (min-width: 1400px) {
          .h-body { width: 58%; padding: 0 88px; }
          .h-bg img { object-position: center center !important; }
        }
      `}</style>

      {/* Image plein fond */}
      <div className="h-bg">
        <Image
          src="/hero section image.png"
          alt="L'Éveil Business — ebook"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "75% center" }}
        />
      </div>

      {/* Overlay de lisibilité */}
      <div className="h-overlay" aria-hidden />

      {/* Contenu par-dessus */}
      <div className="h-body">

        <h1 className="h-headline">
          <span className="h-line">Trouve ton idée</span>
          <span className="h-line">business</span>
          <em className="h-line-em">naturellement.</em>
        </h1>

        <p className="h-sub">
          70+ pages de méthode concrète pour trouver ton idée <br/> surmonter le doute et lancer un business solide à ton rythme, sur tes propres bases.
        </p>

        <div className="h-perks">
          <div className="h-perk">
            <span className="h-perk-ico" style={{ background: "rgba(201,148,58,.14)" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#C9943A" strokeWidth="1.8">
                <path d="M1.5 5.5l2.5 2.5 5.5-5.5"/>
              </svg>
            </span>
            Clarté sur ton idée
          </div>
          <div className="h-perk">
            <span className="h-perk-ico" style={{ background: "rgba(107,87,68,.1)" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#6B5744" strokeWidth="1.8">
                <path d="M5.5 1v9M1 5.5h9"/>
              </svg>
            </span>
            3 piliers de méthode
          </div>
          <div className="h-perk">
            <span className="h-perk-ico" style={{ background: "rgba(201,148,58,.14)" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#C9943A" strokeWidth="1.8">
                <path d="M2 2.5h7M2 5.5h7M2 8.5h4"/>
              </svg>
            </span>
            70+ pages actionnables
          </div>
          <div className="h-perk">
            <span className="h-perk-ico" style={{ background: "rgba(107,87,68,.1)" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#6B5744" strokeWidth="1.8">
                <path d="M5.5 1l.9 2.8h2.9l-2.4 1.7.9 2.9-2.3-1.7-2.3 1.7.9-2.9L1.7 3.8h2.9z"/>
              </svg>
            </span>
            Accès immédiat · PDF
          </div>
        </div>

        <div className="h-actions">
          <a href="#acheter" className="h-btn-main">
            Obtenir l&apos;ebook maintenant
            <span className="h-btn-ico" aria-hidden>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 6.5h9M7 2.5l4 4-4 4" />
              </svg>
            </span>
          </a>
        </div>

      </div>

      {/* Scroll cue desktop */}
      <div className="h-cue" aria-hidden>
        <div className="h-cue-line" />
        <span>Scroll</span>
      </div>

    </section>
  );
}
