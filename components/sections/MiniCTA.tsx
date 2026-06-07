"use client";

export function MiniCTA() {
  return (
    <div className="mcta">
      <style>{`
        .mcta {
          background: var(--bg-2);
          padding: 40px 28px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        /* Ligne or décorative en haut */
        .mcta::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 48px; height: 2px;
          background: var(--gold);
          opacity: .6;
        }

        .mcta-stars {
          display: flex; align-items: center; justify-content: center; gap: 3px;
          color: var(--gold); font-size: 13px;
          letter-spacing: 2px; margin-bottom: 14px;
        }
        .mcta-stars span {
          font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-soft); font-family: var(--sans);
          margin-left: 10px;
        }

        .mcta-line {
          font-family: var(--serif);
          font-size: clamp(20px, 4vw, 30px);
          line-height: 1.2; letter-spacing: -0.025em;
          color: var(--choco-2); font-weight: 700;
          margin-bottom: 24px;
          text-wrap: balance;
        }
        .mcta-line em {
          font-style: italic; color: var(--nude-3);
        }

        .mcta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          min-height: 52px; padding: 0 28px;
          background: var(--choco-2); color: var(--bg);
          border-radius: 999px;
          font-size: 13.5px; font-weight: 600; letter-spacing: 0.02em;
          box-shadow: 0 12px 28px -12px rgba(43,26,18,.45);
          transition: transform .25s ease, box-shadow .35s ease, background .2s ease;
          position: relative; overflow: hidden;
        }
        .mcta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,.1) 50%, transparent 70%);
          transform: translateX(-130%) skewX(-15deg); pointer-events: none;
        }
        .mcta-btn:hover {
          background: var(--ink); transform: translateY(-2px);
          box-shadow: 0 20px 44px -14px rgba(43,26,18,.6), 0 0 0 4px var(--gold-glow);
        }
        .mcta-btn:hover::before { animation: shimmer-pass .55s ease forwards; }

        .mcta-note {
          margin-top: 12px;
          font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-light);
        }

        @media (min-width: 900px) {
          .mcta { padding: 52px 80px; }
          .mcta-line { font-size: clamp(24px, 2.8vw, 34px); }
        }
      `}</style>

      <div className="mcta-stars">
        ★★★★★
        <span>500+ lecteurs · 4,9 / 5</span>
      </div>

      <p className="mcta-line">
        Tu as les idées. Il te manque juste <em>la méthode.</em>
      </p>

      <a href="#acheter" className="mcta-btn">
        Obtenir l&apos;ebook — 29,12 €
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M2 6.5h9M7 2.5l4 4-4 4" />
        </svg>
      </a>

      <p className="mcta-note">Accès immédiat · Garantie 14 jours</p>
    </div>
  );
}
