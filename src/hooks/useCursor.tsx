import { useEffect, useRef, useState } from "react";

export default function useCursor() {
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    hovering: false,
  });

  // Raw mousemove events can fire many times per animation frame (especially on
  // trackpads). Updating React state directly on every event causes jank/jitter
  // once anything else is also animating (e.g. a hovered icon's own transition).
  // Coalesce into at most one state update per frame via requestAnimationFrame.
  const latest = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const updateHover = () => {
      frame.current = null;
      const { x, y } = latest.current;
      const el = document.elementFromPoint(x, y) as HTMLElement;

      const hovering = !!(
        el &&
        (
          el.tagName === "BUTTON" ||
          el.tagName === "A" ||
          el.closest(".clickable")
        )
      );

      setCursor({ x, y, hovering });
    };

    const schedule = () => {
      if (frame.current === null) {
        frame.current = requestAnimationFrame(updateHover);
      }
    };

    const move = (e: MouseEvent) => {
      latest.current = { x: e.clientX, y: e.clientY };
      schedule();
    };

    const scroll = () => {
      schedule();
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", scroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return cursor;
}