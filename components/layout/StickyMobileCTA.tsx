"use client";

import { useState, useEffect } from "react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero") as HTMLElement | null;
    const finalSec = document.getElementById("acheter");

    const onScroll = () => {
      const y = window.scrollY;
      const heroH = hero?.offsetHeight ?? window.innerHeight;
      const finalTop = finalSec?.offsetTop ?? Infinity;
      const show = y > heroH * 0.7 && y + window.innerHeight < finalTop + 200;
      setVisible(show);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .sticky-cta {
          position: fixed; left: 50%; transform: translateX(-50%) translateY(120%);
          bottom: 14px; z-index: 80;
          width: calc(100% - 24px); max-width: 406px;
          padding: 10px 10px 10px 18px;
          background: rgba(43,26,18,.92);
          -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
          border: 1px solid rgba(246,241,235,.1);
          border-radius: 999px;
          box-shadow: 0 30px 60px -24px rgba(43,26,18,.65);
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          transition: transform .5s cubic-bezier(.2,.7,.2,1);
        }
        .sticky-cta.is-visible { transform: translateX(-50%) translateY(0); }
        .sticky-cta .label { color: var(--bg); font-size: 12px; line-height: 1.25; }
        .sticky-cta .label b {
          font-family: var(--serif); font-style: italic;
          font-size: 15px; color: var(--nude); font-weight: 400;
        }
        .sticky-cta .btn-pill {
          min-height: 42px; padding: 0 16px;
          background: var(--bg); color: var(--choco-2);
          font-size: 12px; letter-spacing: 0.04em;
          border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          font-weight: 500;
          transition: background .2s ease;
        }
        .sticky-cta .btn-pill:hover { background: #fff; }
        @media (min-width: 900px) { .sticky-cta { display: none !important; } }
      `}</style>

      <div className={`sticky-cta ${visible ? "is-visible" : ""}`} id="stickyCta">
        <div className="label">
          L&apos;ebook complet<br />
          <b>29,12 €</b>
        </div>
        <a href="#acheter" className="btn-pill">Le télécharger</a>
      </div>
    </>
  );
}
