"use client";

/**
 * Custom wheel-jacking (mouse/trackpad heuristic based on deltaY) was removed:
 * it misdetected input devices and could snap the page between sections
 * unrequested. Native scrolling (scroll-behavior: smooth in globals.css)
 * handles section navigation reliably across all devices.
 */
export default function usePageScroll() {}
