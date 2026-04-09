"use client";

import { useState } from "react";
import { AboutPopup } from "./AboutPopup";

type Props = {
  name: string;
  tagline: string;
};

export function HomeNav({ name, tagline }: Props) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsAboutOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      {(isAboutOpen || isClosing) && (
        <div 
          className="fixed inset-0 z-30"
          onClick={handleClose}
        />
      )}
      <nav className="fixed top-0 left-5 right-5 lg:left-10 lg:right-10 z-50 flex items-center justify-between px-6 py-4 sm:py-6">
      <div className="flex items-center gap-2 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isAboutOpen) {
              handleClose();
            } else {
              setIsAboutOpen(true);
            }
          }}
          className="inline-flex h-9 w-9 items-center overflow-hidden justify-center rounded-xl border border-white/15 bg-white/[0.07] text-sm font-semibold transition-smooth hover:bg-white/[0.15] hover:border-white/40 hover:shadow-lg"
        >
          {isAboutOpen ? "✕" : "☰"}
        </button>
        <span className="text-sm font-medium text-white/80">
          {name} · {tagline}
        </span>
        {(isAboutOpen || isClosing) && <AboutPopup onClose={handleClose} isClosing={isClosing} />}
      </div>
      <div className="flex items-center gap-4 text-sm text-white/70 print:hidden">
        <button 
          className="transition-smooth hover:text-white" 
          onClick={() => scrollToSection("projects")}
        >
          Projets
        </button>
        <button
          className="transition-smooth rounded-xl border border-white/20 bg-white/[0.06] px-3 py-1.5 font-medium text-white hover:border-sky-500/30 hover:bg-white/[0.09]"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </button>
      </div>
    </nav>
    </>
  );
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "auto",
    block: "start",
  });
};
