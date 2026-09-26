"use client";

import useCursor from "@/hooks/useCursor";

export default function Cursor() {
  const { x, y } = useCursor();

  return (
    <>
      {/* outer ring: always trails the pointer with a short transition, giving it a slight lag/elastic follow */}
      <div
        className="fixed cursor-custom mix-blend-difference rounded-full border border-white/50 pointer-events-none w-[26px] h-[26px] -translate-x-[13px] -translate-y-[13px] z-[999]"
        style={{
          left: x,
          top: y,
          transition: "left 80ms ease-out, top 80ms ease-out",
        }}
      />
      {/* inner dot: tracks the pointer 1:1, no lag, for precise targeting */}
      <div
        className="fixed cursor-custom mix-blend-difference rounded-full bg-white pointer-events-none w-2 h-2 -translate-x-1 -translate-y-1 z-[999]"
        style={{
          left: x,
          top: y,
          zIndex: 999,
        }}
      />
    </>
  );
}
