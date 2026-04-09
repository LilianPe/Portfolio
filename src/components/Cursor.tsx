"use client";

import useCursor from "@/hooks/useCursor";

export default function Cursor() {
  const { x, y, hovering } = useCursor();

  return (
    <div
      className={`fixed mix-blend-difference opacity-75 w-12 h-12 bg-violet-600/100 blur-sm rounded-full pointer-events-none -translate-x-8 -translate-y-8 transition-transform duration-150 z-[999] ${hovering ? "scale-50" : "scale-100"}`}
      style={{
        left: x,
        top: y,
        zIndex: 999,
      }}
    />
  );
}
