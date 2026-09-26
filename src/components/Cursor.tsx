"use client";

import useCursor from "@/hooks/useCursor";

export default function Cursor() {
  const { x, y } = useCursor();

  return (
    <div
      className="fixed cursor-custom mix-blend-difference rounded-full bg-white pointer-events-none w-2 h-2 -translate-x-1 -translate-y-1 z-[999]"
      style={{
        left: x,
        top: y,
        zIndex: 999,
      }}
    />
  );
}
