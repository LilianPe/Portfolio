import { useEffect } from "react";

// Desktop layout only (Tailwind `lg`): below it, the page scrolls natively.
const DESKTOP_QUERY = "(min-width: 1024px)";
// Close to the browsers' native snap/smooth-scroll animations.
const DURATION_MS = 450;
// Wheel delta (px) a gesture must accumulate before it turns the page.
const WHEEL_THRESHOLD = 30;
// Silence (ms) that ends a wheel gesture. Trackpad inertia keeps firing events
// for a while after the finger lifts: they belong to the same gesture.
const GESTURE_GAP_MS = 180;
const SWIPE_THRESHOLD = 50;

// Ease-out: moves immediately on input and settles softly, like native scrolling.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Nearest ancestor of `from` that can still scroll in the direction of `dy`. */
function scrollableAncestor(from: EventTarget | null, dy: number, stop: HTMLElement) {
  let el = from instanceof Element ? from : null;
  while (el && el !== stop && el !== document.body) {
    if (el instanceof HTMLElement && el.scrollHeight > el.clientHeight + 1) {
      const oy = getComputedStyle(el).overflowY;
      if (oy === "auto" || oy === "scroll") {
        const canDown = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
        const canUp = el.scrollTop > 0;
        if ((dy > 0 && canDown) || (dy < 0 && canUp)) return el;
      }
    }
    el = el.parentElement;
  }
  return null;
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  );
}

/**
 * "One gesture = one section" paging for the #snap container.
 *
 * Replaces CSS `scroll-snap-type: y mandatory`, whose snap-point selection is left
 * to each engine: Gecko snaps in the gesture's direction, Blink snaps to the
 * nearest point and re-snaps between wheel events, which dragged the page back
 * mid-scroll in Chrome. Here every engine runs the same logic and the same
 * animation (requestAnimationFrame + easing on scrollTop).
 */
export function useSectionPager(containerId: string) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sections = () => Array.from(container.children) as HTMLElement[];
    const pageHeight = () => container.clientHeight;
    const currentIndex = () => Math.round(container.scrollTop / pageHeight());

    let animating: number | null = null;
    let index = currentIndex();
    let wheelAccum = 0;
    let gestureConsumed = false; // this gesture already turned a page / scrolled an inner area
    let lastWheel = 0;

    const animateTo = (top: number) => {
      if (animating !== null) cancelAnimationFrame(animating);
      const from = container.scrollTop;
      const dist = top - from;
      if (Math.abs(dist) < 1 || reducedMotion.matches) {
        container.scrollTop = top;
        animating = null;
        return;
      }
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        container.scrollTop = from + dist * easeOutCubic(t);
        animating = t < 1 ? requestAnimationFrame(step) : null;
      };
      animating = requestAnimationFrame(step);
    };

    const goTo = (i: number) => {
      const max = sections().length - 1;
      index = Math.max(0, Math.min(max, i));
      animateTo(index * pageHeight());
    };

    const onWheel = (e: WheelEvent) => {
      if (!desktop.matches || e.ctrlKey) return; // ctrl+wheel = zoom
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal gesture

      const now = performance.now();
      if (now - lastWheel > GESTURE_GAP_MS) {
        wheelAccum = 0;
        gestureConsumed = false;
      }
      lastWheel = now;

      // An inner scroll area (project description, media list…) scrolls natively
      // until it reaches its edge. The rest of that gesture's inertia must not
      // then turn the page: wait for a fresh gesture.
      if (scrollableAncestor(e.target, e.deltaY, container)) {
        gestureConsumed = true;
        return;
      }
      e.preventDefault();
      if (gestureConsumed || animating !== null) return;

      const px = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * pageHeight() : e.deltaY;
      wheelAccum += px;
      if (Math.abs(wheelAccum) >= WHEEL_THRESHOLD) {
        gestureConsumed = true;
        goTo(index + Math.sign(wheelAccum));
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!desktop.matches || e.altKey || e.ctrlKey || e.metaKey || isTyping(e.target)) return;
      const keys: Record<string, number | "first" | "last"> = {
        ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, Home: "first", End: "last",
      };
      let move = keys[e.key];
      if (e.key === " ") {
        // Space on a focused button/link activates it, it doesn't page.
        if (e.target instanceof Element && e.target.closest("button, a, summary, [role=button]")) return;
        move = e.shiftKey ? -1 : 1;
      }
      if (move === undefined) return;
      // Arrow keys still scroll a focused inner area natively.
      const dir = move === "first" ? -1 : move === "last" ? 1 : move;
      if (e.key.startsWith("Arrow") && scrollableAncestor(document.activeElement, dir, container)) return;
      e.preventDefault();
      if (move === "first") goTo(0);
      else if (move === "last") goTo(sections().length - 1);
      else goTo(index + move);
    };

    // Touch screens wide enough for the desktop layout (tablets, touch laptops).
    let touchY: number | null = null;
    let touchInner = false;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touchInner = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!desktop.matches || touchY === null) return;
      const dy = touchY - e.touches[0].clientY;
      if (touchInner || scrollableAncestor(e.target, dy, container)) {
        touchInner = true;
        return;
      }
      e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!desktop.matches || touchY === null || touchInner) return;
      const dy = touchY - e.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(dy) >= SWIPE_THRESHOLD) goTo(index + Math.sign(dy));
    };

    // In-page links (#projects, side nav dots) go through the same animation.
    const onClick = (e: MouseEvent) => {
      if (!desktop.matches || e.defaultPrevented || e.button !== 0) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return;
      const i = sections().findIndex((s) => s.id === id);
      if (i < 0) return;
      e.preventDefault();
      history.replaceState(null, "", `#${id}`);
      goTo(i);
    };

    // Anything else that moves the container (Tab focusing a field, find-in-page,
    // a browser restoring the position) is re-aligned on a section once it settles.
    let settle: number | undefined;
    const onScroll = () => {
      if (animating !== null) return;
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        if (animating !== null || !desktop.matches) return;
        index = currentIndex();
        if (Math.abs(container.scrollTop - index * pageHeight()) > 1) goTo(index);
      }, 150);
    };

    // Keep the current section aligned when the viewport is resized.
    const onResize = () => {
      if (!desktop.matches) return;
      if (animating !== null) cancelAnimationFrame(animating);
      animating = null;
      container.scrollTop = index * pageHeight();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    document.addEventListener("click", onClick);
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Landing on /#contact: start on that section.
    const initial = sections().findIndex((s) => s.id === location.hash.slice(1));
    if (initial > 0 && desktop.matches) {
      index = initial;
      container.scrollTop = index * pageHeight();
    }

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("click", onClick);
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(settle);
      if (animating !== null) cancelAnimationFrame(animating);
    };
  }, [containerId]);
}
