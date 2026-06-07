"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const PROBLEMS = [
  {
    n: "01",
    head: "Tu doutes de toi.",
    body: "Tu veux lancer quelque chose — mais une petite voix répète que ce n'est pas pour toi. Que tu manques de légitimité, d'expérience, de quelque chose.",
  },
  {
    n: "02",
    head: "Tu as trop d'idées.",
    body: "Elles s'accumulent dans un carnet, dans ta tête, sur des post-its. Mais aucune ne semble être LA bonne. Alors tu n'en lances aucune.",
  },
  {
    n: "03",
    head: "Tu attends le bon moment.",
    body: "Quand tu auras plus de temps. Quand la situation sera meilleure. Quand tu te sentiras prêt·e. Le bon moment qui ne vient jamais.",
  },
  {
    n: "04",
    head: "Tu te compares et tu perds pied.",
    body: "Les réseaux te montrent des gens qui semblent avoir tout compris. Tu te demandes ce qu'ils ont que tu n'as pas. La réponse : une méthode.",
  },
  {
    n: "05",
    head: "Tu sais que tu peux. Mais tu ne sais pas comment.",
    body: "Ce n'est pas le désir qui manque. Ni le talent. C'est la direction — cette boussole intérieure qui te dirait : commence par là.",
  },
];

export function Problems() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="problemes" className="probs-section">
      <style>{`
        /* ── LAYOUT ── */
        .probs-section {
          display: grid;
          min-height: 100svh;
        }

        /* ── LEFT: photo + emotional diagnosis ── */
        .probs-left {
          position: relative; overflow: hidden;
          padding: 72px 32px 64px;
          display: flex; flex-direction: column; justify-content: center;
          min-height: 540px;
        }
        /* Gradient overlay sur la photo pour lisibilité du texte */
        .probs-left-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            145deg,
            rgba(43,26,18,.88) 0%,
            rgba(43,26,18,.72) 55%,
            rgba(43,26,18,.58) 100%
          );
        }
        /* Contenu textuel au-dessus de l'overlay */
        .probs-left-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
        }
        .probs-tag {
          font-size: 10.5px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--nude-2); font-weight: 500;
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 36px;
        }
        .probs-tag::before {
          content: ''; width: 18px; height: 1px;
          background: var(--nude-2); opacity: .6; flex-shrink: 0;
        }
        .probs-diag {
          font-family: var(--serif);
          font-size: clamp(36px, 5.5vw, 64px);
          line-height: 1.08; letter-spacing: -0.03em;
          color: rgba(246,241,235,.95);
          font-weight: 700; margin-bottom: 32px;
          text-wrap: balance;
        }
        .probs-diag em {
          font-style: italic; color: var(--nude);
          display: block;
        }
        .probs-divider {
          width: 36px; height: 1px;
          background: var(--nude-2); opacity: .4;
          margin-bottom: 28px;
        }
        .probs-real {
          font-family: var(--serif);
          font-size: clamp(18px, 2.2vw, 24px);
          line-height: 1.45; letter-spacing: -0.015em;
          color: rgba(246,241,235,.65);
          max-width: 32ch;
        }
        .probs-real em { font-style: italic; color: rgba(214,193,174,.9); }
        .probs-affirm {
          margin-top: 44px; padding: 24px 22px;
          border: 1px solid rgba(246,241,235,.1);
          border-radius: 14px;
          background: rgba(246,241,235,.04);
        }
        .probs-affirm p {
          font-size: 13px; line-height: 1.65;
          color: rgba(246,241,235,.5);
          letter-spacing: 0.01em;
        }
        .probs-affirm strong {
          color: rgba(246,241,235,.8); font-weight: 500;
        }

        /* ── RIGHT: specific problems ── */
        .probs-right {
          background: var(--choco);
          padding: 72px 32px 64px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .probs-list { display: flex; flex-direction: column; gap: 0; }
        .prob-item {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 0 16px;
          padding: 22px 0;
          border-bottom: 1px solid rgba(246,241,235,.09);
          align-items: start;
        }
        .prob-item:first-child { border-top: 1px solid rgba(246,241,235,.09); }
        .prob-num {
          font-family: var(--serif); font-style: italic;
          font-size: 12px; color: var(--nude-2);
          padding-top: 4px;
          letter-spacing: 0.04em;
        }
        .prob-body {}
        .prob-head {
          font-family: var(--serif);
          font-size: clamp(17px, 2vw, 20px);
          line-height: 1.25; letter-spacing: -0.02em;
          color: rgba(246,241,235,.93); font-weight: 600;
          margin-bottom: 6px;
        }
        .prob-desc {
          font-size: 13.5px; line-height: 1.62;
          color: rgba(246,241,235,.5);
        }

        .probs-pivot {
          margin-top: 36px; padding: 32px 26px;
          background: rgba(246,241,235,.05);
          border: 1px solid rgba(246,241,235,.1);
          border-radius: 16px;
          position: relative; overflow: hidden;
        }
        .probs-pivot::before {
          content: '"';
          font-family: var(--serif);
          font-size: 100px; line-height: 0.7;
          color: rgba(199,165,138,.2);
          position: absolute; top: 8px; left: 16px;
          pointer-events: none;
        }
        .probs-pivot-text {
          font-family: var(--serif);
          font-size: clamp(17px, 2.5vw, 22px);
          line-height: 1.3; letter-spacing: -0.015em;
          color: rgba(246,241,235,.9);
          position: relative;
          text-wrap: balance;
        }
        .probs-pivot-text em { font-style: italic; color: var(--nude); }
        .probs-pivot-sig {
          margin-top: 14px;
          font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(246,241,235,.35);
        }
        .probs-cta-link {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 32px;
          font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--nude); font-weight: 500;
          transition: color .2s ease;
        }
        .probs-cta-link svg { transition: transform .25s ease; }
        .probs-cta-link:hover { color: rgba(246,241,235,.9); }
        .probs-cta-link:hover svg { transform: translateX(3px); }

        /* ── DESKTOP ── */
        @media (min-width: 900px) {
          .probs-section {
            grid-template-columns: 44fr 56fr;
            min-height: 100svh;
          }
          .probs-left  { padding: 120px 72px 100px; }
          .probs-right { padding: 120px 64px 100px; }
          .prob-item   { padding: 24px 0; }
          .probs-pivot { padding: 36px 32px; }
        }
        @media (min-width: 1200px) {
          .probs-left  { padding: 140px 88px 120px; }
          .probs-right { padding: 140px 80px 120px; }
        }
      `}</style>

      {/* ── LEFT ── */}
      <div className="probs-left">
        {/* Photo de fond */}
        <Image
          src="/persona a.png"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center center" }}
          sizes="(min-width:900px) 44vw, 100vw"
          aria-hidden
        />
        {/* Overlay sombre pour lisibilité */}
        <div className="probs-left-overlay" aria-hidden />

        {/* Contenu textuel */}
        <div className="probs-left-content">
          <span className="probs-tag reveal">Reconnais-toi</span>

          <h2 className="probs-diag reveal" data-d="1">
            Ce n&apos;est pas le talent qui te <em>manque.</em>
          </h2>

          <div className="probs-divider reveal" data-d="2" />

          <p className="probs-real reveal" data-d="2">
            C&apos;est la <em>clarté</em> — sur toi, sur ton idée, sur par où commencer vraiment.
          </p>

          <div className="probs-affirm reveal" data-d="3">
            <p>
              <strong>Tu as l&apos;ambition.</strong> Tu as les idées. Tu as ce désir profond de construire quelque chose qui te ressemble. Ce qui manque, c&apos;est la méthode pour transformer tout ça en mouvement.
            </p>
          </div>

          <a href="#acheter" className="probs-cta-link reveal" data-d="4">
            Je veux cette clarté
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="probs-right">
        <div className="probs-list">
          {PROBLEMS.map(({ n, head, body }, i) => (
            <div key={n} className="prob-item reveal" data-d={String((i % 4) + 1)}>
              <span className="prob-num">{n}</span>
              <div className="prob-body">
                <p className="prob-head">{head}</p>
                <p className="prob-desc">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="probs-pivot reveal" data-d="2">
          <p className="probs-pivot-text">
            Et si ton business ne devait pas commencer par une <em>stratégie</em>… mais par <em>toi</em> ?
          </p>
          <div className="probs-pivot-sig">— La vraie question</div>
        </div>
      </div>
    </section>
  );
}
