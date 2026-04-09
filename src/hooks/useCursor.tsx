import { useEffect, useState } from "react";

export default function useCursor() {
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    hovering: false,
  });

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const updateHover = (x: number, y: number) => {
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

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateHover(mouseX, mouseY);
    };

    const scroll = () => {
      updateHover(mouseX, mouseY);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return cursor;
}