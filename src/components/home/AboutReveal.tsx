"use client";

import { useEffect, useRef, useState } from "react";

const BIO =
  "Développeur formé à l'école 42, j'ai suivi un parcours atypique basé sur l'apprentissage par projets en peer-learning, en autonomie complète. J'y ai développé une capacité à apprendre rapidement et à m'adapter à des problématiques variées, allant de la programmation bas niveau et des algorithmes jusqu'à des projets plus avancés, notamment en intelligence artificielle. Sérieux et assidu dans mon parcours, j'aime aller au bout des sujets que j'aborde et construire des solutions propres et efficaces. Aujourd'hui, je m'épanouis dans le développement au sens large, avec l'envie de continuer à progresser et à relever de nouveaux défis techniques.";

export function AboutReveal() {
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={shellRef}
      className="fixed left-8 bottom-6 z-40 flex w-[min(380px,calc(100vw-3rem))] flex-col"
    >
      <div
        className="grid overflow-hidden"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 380ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="min-h-0">
          <div className="mb-2.5 border border-white/10 bg-[rgb(23,30,50)] px-6 py-5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)]">
            <h3 className="mb-3 text-xs uppercase tracking-[0.12em] text-white/50">
              À propos
            </h3>
            <div className="max-h-[min(52vh,380px)] -mr-4 overflow-y-auto pr-4">
              <p className="text-sm leading-[1.9] tracking-[0.015em] text-white/70">
                {BIO}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="clickable self-start px-1 py-1.5 font-sans text-xs text-white/50 transition-colors hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
      >
        À propos
      </button>
    </div>
  );
}
