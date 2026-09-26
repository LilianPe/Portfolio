"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Accueil" },
  { id: "projects", label: "Projets" },
  { id: "contact", label: "Contact" },
] as const;

export function SideNav() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const snap = document.getElementById("snap");
    if (!snap) return;

    const updateActive = () => {
      const idx = Math.round(snap.scrollTop / snap.clientHeight);
      const clamped = Math.max(0, Math.min(SECTIONS.length - 1, idx));
      setActive(SECTIONS[clamped].id);
    };

    updateActive();
    snap.addEventListener("scroll", updateActive, { passive: true });
    return () => snap.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <nav
      aria-label="Navigation des sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ol className="flex flex-col items-end gap-5">
        {SECTIONS.map((section) => {
          const isActive = section.id === active;
          return (
            <li key={section.id} className="group relative flex items-center justify-end">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute right-full mr-2.5 whitespace-nowrap text-xs font-sans opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 ${
                  isActive ? "text-white" : "text-white/70"
                }`}
              >
                {section.label}
              </span>
              <a
                href={`#${section.id}`}
                aria-label={section.label}
                aria-current={isActive ? "true" : undefined}
                className="clickable relative -m-3 flex items-center justify-center rounded-full p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
              >
                <span
                  aria-hidden="true"
                  className={`h-[7px] w-[7px] shrink-0 rounded-full transition-transform duration-200 ${
                    isActive ? "scale-[1.4] bg-sky-400" : "bg-white/30"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
