"use client";

import { useEffect, useRef } from "react";

const FAQS = [
  {
    q: "C'est pour qui exactement ?",
    a: "Pour toute personne qui veut lancer un business — ou y penser sérieusement — mais qui se sent bloquée par le doute, la confusion ou le manque de direction. Que tu aies une idée ou cent idées, l'ebook te donne le filtre pour choisir la bonne.",
  },
  {
    q: "Je ne suis pas encore prêt·e à lancer. Est-ce que ça me correspond quand même ?",
    a: "Oui — c'est même fait pour ça. L'ebook ne te dit pas « lance maintenant ». Il te construit les fondations mentales et stratégiques pour que quand tu le feras, ce soit ancré et solide. La clarté vient avant l'action.",
  },
  {
    q: "Comment je reçois l'ebook après l'achat ?",
    a: "Immédiatement après le paiement, tu reçois un e-mail avec ton lien de téléchargement personnel. Le fichier est en PDF haute résolution, optimisé pour lecture sur écran et impression.",
  },
  {
    q: "Est-ce du contenu générique qu'on trouve partout ?",
    a: "Non. L'ebook est construit autour d'une méthode en 3 piliers développée pour celles et ceux qui veulent construire depuis qui ils sont — pas depuis ce qui marche pour les autres. La progression est pensée, les exercices sont ciblés.",
  },
  {
    q: "Et si l'ebook ne me convient pas ?",
    a: "Tu es couvert·e par une garantie satisfait ou remboursé de 14 jours. Si tu lis l'ebook et que tu n'y trouves pas la clarté promise, le remboursement est effectué sans question posée.",
  },
  {
    q: "Combien de temps faut-il pour le lire ?",
    a: "70+ pages dans un format aéré et lisible. En lecture active, comptez 2 à 3 heures. La vraie valeur est dans les exercices — certains lecteurs y reviennent plusieurs fois sur plusieurs semaines.",
  },
  {
    q: "Y a-t-il un suivi ou un accompagnement inclus ?",
    a: "L'ebook est en accès totalement autonome — tu avances à ton propre rythme. Si tu veux un accompagnement plus personnalisé dans le futur, d'autres offres sont disponibles, mais l'ebook seul est pensé pour être complet et actionnable.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.07, rootMargin: "0px 0px -5% 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="faq" className="faq-section">
      <style>{`
        .faq-section {
          background: var(--bg-2);
          padding: 88px 24px;
        }
        .faq-inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .faq-head { text-align: center; margin-bottom: 52px; }
        .faq-h2 {
          font-family: var(--serif);
          font-size: clamp(32px, 6vw, 50px);
          line-height: 1.08; letter-spacing: -0.025em;
          color: var(--choco-2); margin-top: 16px;
        }
        .faq-h2 em { font-style: italic; color: var(--nude-2); }
        .faq-list { display: flex; flex-direction: column; }
        .faq-item { border-bottom: 1px solid var(--line-2); }
        .faq-item:first-child { border-top: 1px solid var(--line-2); }
        .faq-summary {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 22px 0;
          cursor: pointer;
          list-style: none;
          font-family: var(--serif);
          font-size: clamp(16px, 2.5vw, 18px);
          line-height: 1.3; letter-spacing: -0.01em;
          color: var(--choco-2);
          user-select: none;
          transition: color .2s ease;
        }
        .faq-summary:hover { color: var(--nude-2); }
        .faq-summary::-webkit-details-marker { display: none; }
        .faq-icon {
          width: 28px; height: 28px; border-radius: 999px;
          border: 1px solid var(--line);
          flex-shrink: 0;
          display: grid; place-items: center;
          transition: background .2s ease, border-color .2s ease, color .2s ease;
          color: var(--ink-soft);
          font-size: 18px; line-height: 1; font-weight: 300;
        }
        details[open] .faq-icon {
          background: var(--gold); border-color: var(--gold);
          color: var(--ink);
        }
        .faq-plus  { display: block; }
        .faq-minus { display: none; }
        details[open] .faq-plus  { display: none; }
        details[open] .faq-minus { display: block; }
        .faq-body {
          font-size: 14.5px; line-height: 1.75;
          color: var(--ink-soft);
          padding-bottom: 24px;
          max-width: 60ch;
        }
        .faq-cta-wrap {
          text-align: center; margin-top: 56px;
        }
        .faq-cta {
          display: inline-flex; align-items: center; gap: 10px;
          min-height: 56px; padding: 0 36px;
          background: var(--choco-2); color: var(--bg);
          border-radius: 999px;
          font-size: 14.5px; font-weight: 600; letter-spacing: 0.02em;
          box-shadow: 0 16px 36px -14px rgba(43,26,18,.45);
          transition: transform .25s ease, box-shadow .35s ease, background .2s ease;
        }
        .faq-cta:hover {
          background: #1A1108;
          transform: translateY(-2px);
          box-shadow: 0 24px 52px -16px rgba(43,26,18,.6);
        }
        .faq-cta-note {
          margin-top: 16px; font-size: 11.5px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-light);
        }
        @media (min-width: 900px) {
          .faq-section { padding: 120px 80px; }
        }
        @media (min-width: 1200px) {
          .faq-section { padding: 140px 120px; }
        }
      `}</style>

      <div className="faq-inner">
        <div className="faq-head reveal">
          <span className="eyebrow">
            <span className="rule" />Questions fréquentes
          </span>
          <h2 className="faq-h2">
            Tu as une <em>question</em> ?<br />
            Elle est probablement ici.
          </h2>
        </div>

        <div className="faq-list">
          {FAQS.map(({ q, a }, i) => (
            <details key={q} className="faq-item reveal" data-d={String((i % 4) + 1)}>
              <summary className="faq-summary">
                <span>{q}</span>
                <span className="faq-icon" aria-hidden>
                  <span className="faq-plus">+</span>
                  <span className="faq-minus">−</span>
                </span>
              </summary>
              <p className="faq-body">{a}</p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
