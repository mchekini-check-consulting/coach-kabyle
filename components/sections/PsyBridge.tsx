export function PsyBridge() {
  return (
    <section className="psy-section">
      <style>{`
        .psy-section {
          background: var(--bg-2);
          padding: 88px 28px;
          position: relative;
          overflow: hidden;
        }

        /* Orb décoratif subtil */
        .psy-orb {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(201,148,58,.06) 0%, transparent 65%);
          top: -160px; right: -120px; filter: blur(80px);
          animation: glow-breathe 14s ease-in-out infinite;
        }

        .psy-inner {
          position: relative; z-index: 1;
          max-width: 760px; margin: 0 auto;
          text-align: center;
        }

        /* Ornement haut */
        .psy-mark {
          display: inline-flex; align-items: center; gap: 16px;
          margin-bottom: 36px;
        }
        .psy-mark-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,148,58,.5));
        }
        .psy-mark-line.r {
          background: linear-gradient(270deg, transparent, rgba(201,148,58,.5));
        }
        .psy-mark-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--gold); opacity: .7;
          transform: rotate(45deg);
        }

        /* Accroche principale */
        .psy-hook {
          font-family: var(--serif);
          font-size: clamp(28px, 5.5vw, 52px);
          line-height: 1.1; letter-spacing: -0.03em;
          color: var(--choco-2); font-weight: 700;
          margin-bottom: 24px;
          text-wrap: balance;
        }
        .psy-hook em { font-style: italic; color: var(--nude-3); }

        /* Sous-accroche */
        .psy-sub {
          font-size: 16px; line-height: 1.72;
          color: var(--ink-soft);
          max-width: 52ch; margin: 0 auto 44px;
        }

        /* Insights — 3 vérités qui font mal */
        .psy-insights {
          display: flex; flex-direction: column; gap: 0;
          text-align: left;
          border-top: 1px solid var(--line-2);
        }
        .psy-insight {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid var(--line-2);
        }
        .psy-insight-num {
          font-family: var(--serif); font-style: italic;
          font-size: 11px; color: var(--gold);
          letter-spacing: 0.1em; padding-top: 3px;
          flex-shrink: 0; width: 24px;
        }
        .psy-insight-text {
          font-size: 15px; line-height: 1.6;
          color: var(--choco-2);
        }
        .psy-insight-text em {
          font-style: italic; color: var(--nude-3);
          font-family: var(--serif);
        }

        /* Citation finale */
        .psy-closing {
          margin-top: 40px;
          font-family: var(--serif); font-style: italic;
          font-size: clamp(20px, 3.5vw, 28px);
          line-height: 1.3; letter-spacing: -0.02em;
          color: var(--choco-2);
          opacity: .75;
        }

        @media (min-width: 900px) {
          .psy-section { padding: 120px 80px; }
          .psy-insights { flex-direction: row; gap: 0; }
          .psy-insight {
            flex: 1; flex-direction: column; gap: 10px;
            padding: 0 28px 0 0;
            border-bottom: none;
            border-right: 1px solid var(--line-2);
          }
          .psy-insight:last-child { border-right: none; padding-right: 0; }
          .psy-insight:not(:first-child) { padding-left: 28px; }
        }
        @media (min-width: 1200px) {
          .psy-section { padding: 140px 120px; }
        }
      `}</style>

      <div className="psy-orb" aria-hidden />

      <div className="psy-inner">

        <div className="psy-mark" aria-hidden>
          <span className="psy-mark-line" />
          <span className="psy-mark-dot" />
          <span className="psy-mark-line r" />
        </div>

        <h2 className="psy-hook">
          Tu n&apos;as pas un problème de talent.<br />
          Tu as un problème de <em>clarté.</em>
        </h2>

        <p className="psy-sub">
          La plupart des gens qui n'avancent pas ne manquent pas d'intelligence, d'ambition ou de potentiel.
          Ils manquent d'un système pour transformer ce qu'ils ont déjà en quelque chose de concret.
        </p>

        <div className="psy-insights">
          <div className="psy-insight">
            <span className="psy-insight-num">01</span>
            <p className="psy-insight-text">
              Tu attends <em>d'être prêt·e</em> — mais la préparation sans direction, c'est juste de la procrastination qui se déguise en sérieux.
            </p>
          </div>
          <div className="psy-insight">
            <span className="psy-insight-num">02</span>
            <p className="psy-insight-text">
              Tu cherches <em>la bonne idée</em> — alors que l'idée juste est déjà en toi. Elle attend juste les bonnes questions pour émerger.
            </p>
          </div>
          <div className="psy-insight">
            <span className="psy-insight-num">03</span>
            <p className="psy-insight-text">
              Tu doutes de toi — mais le doute n'est pas un signe que tu n'es pas fait·e pour ça. C'est un signe que tu <em>y tiens vraiment.</em>
            </p>
          </div>
        </div>

        <p className="psy-closing">
          &ldquo; Ce qui te manque n&apos;est pas en dehors de toi. &rdquo;
        </p>

      </div>
    </section>
  );
}
