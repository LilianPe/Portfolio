import { useEffect, useRef } from "react";

// Time constant of the ring's trailing follow, in ms. ~63% of the gap to the
// pointer is closed every RING_LAG_MS, independently of the display refresh rate.
const RING_LAG_MS = 35;

/**
 * Drives the custom cursor imperatively: one requestAnimationFrame loop writes
 * `transform` on the two elements, without React re-renders.
 *
 * Why not CSS `transition` on `left`/`top`: the target changes every frame, so the
 * transition is restarted every frame. Blink (Chrome, Edge…) samples a restarted
 * transition at progress 0 on its first frame, so the ring froze on most frames
 * and moved in jerks — Gecko didn't show it. Interpolating in JS behaves the same
 * in every engine, and `transform` is composited (no layout/paint per frame).
 */
export default function useCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const target = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let frame: number | null = null;
    let last = 0;
    let visible = false;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 16;
      last = now;
      const k = 1 - Math.exp(-dt / RING_LAG_MS);
      ringPos.x += (target.x - ringPos.x) * k;
      ringPos.y += (target.y - ringPos.y) * k;
      place(dot, target.x, target.y);
      place(ring, ringPos.x, ringPos.y);

      // Stop the loop once the ring has caught up; the next mousemove restarts it.
      if (Math.abs(target.x - ringPos.x) < 0.1 && Math.abs(target.y - ringPos.y) < 0.1) {
        frame = null;
        last = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        // First move: start the ring on the pointer instead of flying in from (0,0).
        visible = true;
        ringPos.x = target.x;
        ringPos.y = target.y;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    const hide = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return { ringRef, dotRef };
}
