"use client";

import { useEffect } from "react";

/** Sets `--vh` on the root element (same as `mxdViewportHeight` in app.js). */
export function useViewportHeight(): void {
  useEffect(() => {
    const root = document.documentElement;
    let viewportWidth = window.innerWidth;
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      root.style.setProperty("--vh", `${vh}px`);
    };
    const updateAfterWidthChange = () => {
      // Ignore height-only resizes from expanding or collapsing mobile browser
      // chrome; updating --vh mid-scroll causes the document to jump.
      if (window.innerWidth === viewportWidth) return;
      viewportWidth = window.innerWidth;
      setVH();
    };
    setVH();
    window.addEventListener("resize", updateAfterWidthChange);
    window.addEventListener("orientationchange", setVH);
    return () => {
      window.removeEventListener("resize", updateAfterWidthChange);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);
}
