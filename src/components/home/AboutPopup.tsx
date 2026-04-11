"use client";

import Image from "next/image";

type Props = {
  onClose: () => void;
  isClosing?: boolean;
};

export function AboutPopup({ onClose, isClosing }: Props) {
  return (
    <div 
      className={`absolute top-16 left-5 z-40 ${isClosing ? "popup-close" : "popup-open"}`}
      onClick={(e) => e.stopPropagation()}
    >
        <div 
          className="w-48 rounded-xl border border-white/30 backdrop-blur-xl p-4 shadow-2xl"
          style={{ backgroundColor: `rgba(12, 25, 56, 0.9)` }}
        >
        <div className="relative w-20 h-20 mx-auto mb-3 rounded-lg overflow-hidden">
          <Image
            src="/me.png"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative max-h-[50vh] overflow-hidden shadow-inner">
            <div className="px-1 py-2">
                <h3 className="text-base font-semibold text-white mb-1">À propos</h3>
                <div className="space-y-2 overflow-y-scroll minimal-scrollbar max-h-[40vh] no-scrollbar px-1 py-2">
                    <p className="text-sm text-white/80 leading-relaxed">
                        Développeur formé à l’école 42, j’ai suivi un parcours atypique basé sur l’apprentissage par projets en peer-learning, en autonomie complète. J’y ai développé une capacité à apprendre rapidement et à m’adapter à des problématiques variées, allant de la programmation bas niveau et des algorithmes jusqu’à des projets plus avancés, notamment en intelligence artificielle.
                        Sérieux et assidu dans mon parcours, j’aime aller au bout des sujets que j’aborde et construire des solutions propres et efficaces. Aujourd’hui, je m’épanouis dans le développement au sens large, avec l’envie de continuer à progresser et à relever de nouveaux défis techniques.
                    </p>
                </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}
