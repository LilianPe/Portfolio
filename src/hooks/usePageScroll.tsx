"use client";

import { useEffect, RefObject } from "react";


export default function usePageScroll(
  sectionRefs: RefObject<HTMLElement | null>[]
) {
  useEffect(() => {
    let isScrolling = false;

    let velocity = 0;
    let isAnimating = false;
    let currentTarget: HTMLElement | null = null;

    const handleWheel = (e: WheelEvent) => {
      const isMouse =  Math.abs(e.deltaY) >= 100 && Number.isInteger(e.deltaY);

      if (!isMouse) return;

      const rawTarget = e.target as HTMLElement;
      
      const target = getScrollableParent(rawTarget);
      
      if (target) {
        e.preventDefault();
        smoothScroll(target, e.deltaY);
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        e.preventDefault();
        scrollToSection(e);
      }
    };

    const smoothScroll = (target: HTMLElement, deltaY: number) => {
      currentTarget = target;

      const hasImages = target.querySelector("img") !== null || target.querySelector("video") !== null;

      velocity += deltaY * (hasImages ? 1 : 0.07);

      if (isAnimating) return;

      isAnimating = true;

      const friction = 0.95;

      const step = () => {
        if (!currentTarget) return;

        currentTarget.scrollTop += velocity;

        velocity *= friction;

        if (Math.abs(velocity) < 1) {
            velocity *= 0.8;
        }

        if (Math.abs(velocity) < 0.001) {
          velocity = 0;
          isAnimating = false;
          return;
        }

        requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const scrollToSection = (e: WheelEvent) => { 

        const direction = e.deltaY > 0 ? 1 : -1;

        const nextSection = direction == 1 ? getNearestSectionDown(sectionRefs) : getNearestSectionUp(sectionRefs);

        if (nextSection) {
            isScrolling = true;
            nextSection.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => (isScrolling = false), 800);
        }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [sectionRefs]);
}

function getNearestSectionDown(sectionRefs: RefObject<HTMLElement | null>[]) {
    const scrollPosition = window.scrollY;
    let nearestSection: HTMLElement | null = null;
    let minDistance = Infinity;

    for (const ref of sectionRefs) {
        const section = ref.current;
        if (section) {
            const distance = section.offsetTop - scrollPosition - section.offsetHeight / 2;
            if (distance > 0 && distance < minDistance) {
                minDistance = distance;
                nearestSection = section;
            }
        }
    }

    return nearestSection;
}

function getNearestSectionUp(sectionRefs: RefObject<HTMLElement | null>[]) {
    const scrollPosition = window.scrollY;
    let nearestSection: HTMLElement | null = null;
    let minDistance = Infinity;

    for (const ref of sectionRefs) {
        const section = ref.current;
        if (section) {
            const distance = scrollPosition - section.offsetTop;
            if (distance > 0 && distance < minDistance) {
                minDistance = distance;
                nearestSection = section;
            }
        }
    }

    return nearestSection;
}

const getScrollableParent = (el: HTMLElement | null): HTMLElement | null => {
  while (el) {
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;

    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight
    ) {
      return el;
    }

    el = el.parentElement!;
  }
  return null;
};