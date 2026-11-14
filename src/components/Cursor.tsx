"use client";

import useCursor from "@/hooks/useCursor";

export default function Cursor() {
  const { ringRef, dotRef } = useCursor();

  // Both elements sit at (0,0) and are moved with `transform` by useCursor; the
  // negative margins centre them on the pointer. Hidden until the first mousemove.
  return (
    <>
      {/* outer ring: trails the pointer slightly (JS interpolation in useCursor) */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 cursor-custom mix-blend-difference rounded-full border border-white/50 pointer-events-none w-[26px] h-[26px] -ml-[13px] -mt-[13px] z-[999] opacity-0 will-change-transform"
      />
      {/* inner dot: tracks the pointer 1:1, no lag, for precise targeting */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 cursor-custom mix-blend-difference rounded-full bg-white pointer-events-none w-2 h-2 -ml-1 -mt-1 z-[999] opacity-0 will-change-transform"
      />
    </>
  );
}
