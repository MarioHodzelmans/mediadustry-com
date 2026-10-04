"use client";

import "@/components/common/LegacyEases";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { activeManagedLenis } from "@/components/common/LenisContext";
import { useBlurContainerRef } from "@/components/animations/BlurScrollRoot";

const CustomCursor = dynamic(() => import("@/components/cursor/CustomCursor"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

let pageTransitionRevealCompleted = false;

export default function LegacyMotionRuntime({
  onLenisChange,
}: {
  onLenisChange: (instance: Lenis | null) => void;
}) {
  const pathname = usePathname();
  const pageTransitionRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const previousPathRef = useRef(pathname);
  const blurContainerRef = useBlurContainerRef();

  useEffect(() => {
    let active = true;
    const transitionEl = pageTransitionRef.current;
    const blurContainer = blurContainerRef.current;
    let transitionTween: gsap.core.Tween | null = null;
    if (transitionEl) {
      if (pageTransitionRevealCompleted) {
        gsap.set(transitionEl, { y: "-100%", pointerEvents: "none" });
      } else {
        pageTransitionRevealCompleted = true;
        transitionTween = gsap.to(transitionEl, {
          y: "-100%",
          duration: 0.35,
          ease: "hop",
          onComplete: () => {
            gsap.set(transitionEl, { pointerEvents: "none" });
          },
        });
      }
    }

    const instance = new Lenis();
    activeManagedLenis.add(instance);
    lenisRef.current = instance;
    instance.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const lenisStateRafId = requestAnimationFrame(() => {
      onLenisChange(instance);
    });
    const refresh = () => {
      if (active) ScrollTrigger.refresh();
    };
    const refreshRafId = requestAnimationFrame(refresh);
    void document.fonts.ready.then(refresh);

    // The full template stylesheet is route-scoped and may finish after hydration.
    const stylesheet = document.getElementById("mxd-legacy-styles");
    stylesheet?.addEventListener("load", refresh);

    let viewportWidth = window.innerWidth;
    const onResize = () => {
      // Ignore height changes from mobile browser chrome while scrolling.
      if (window.innerWidth === viewportWidth) return;
      viewportWidth = window.innerWidth;
      refresh();
    };
    window.addEventListener("resize", onResize);

    const onPageShow = (event: PageTransitionEvent) => {
      const navEntry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (event.persisted || navEntry?.type === "back_forward") {
        const el = pageTransitionRef.current;
        if (el) gsap.set(el, { y: "-100%", pointerEvents: "none" });
      }
    };
    window.addEventListener("pageshow", onPageShow);
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      active = false;
      transitionTween?.kill();
      cancelAnimationFrame(lenisStateRafId);
      cancelAnimationFrame(refreshRafId);
      stylesheet?.removeEventListener("load", refresh);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", onPageShow);
      window.history.scrollRestoration = previousScrollRestoration;
      gsap.ticker.remove(tickerFn);
      instance.off("scroll", ScrollTrigger.update);
      activeManagedLenis.delete(instance);
      instance.stop();
      instance.destroy();
      lenisRef.current = null;
      onLenisChange(null);
      if (blurContainer) blurContainer.style.display = "none";
    };
  }, [onLenisChange, blurContainerRef]);

  useLayoutEffect(() => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;
    const instance = lenisRef.current;
    if (instance) instance.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);

    const refreshRafId = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(refreshRafId);
  }, [pathname]);

  return (
    <>
      <div
        ref={pageTransitionRef}
        className="mxd-page-transition"
        style={{ transform: "translateY(-100%)", pointerEvents: "none" }}
        aria-hidden
      />
      <CustomCursor />
    </>
  );
}
