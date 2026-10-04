"use client";

import "lenis/dist/lenis.css";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { useViewportHeight } from "@/hooks/useViewportHeight";
import { LenisContext } from "@/components/common/LenisContext";
import BlurScrollRoot from "@/components/animations/BlurScrollRoot";
import { CursorProvider } from "@/components/cursor/CursorContext";
import CustomCursor from "@/components/cursor/CustomCursor";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", ".87, 0, .13, 1");
CustomEase.create("common", ".23, .65, .74, 1.09");
CustomEase.create("custom", ".23, .65, .74, 1.09");

let pageTransitionRevealCompleted = false;

export default function TemplateRuntimeProvider({
  children,
}: {
  children: ReactNode;
}) {
  useViewportHeight();
  const pathname = usePathname();
  const isShowcaseRoute =
    pathname === "/concept" || pathname.startsWith("/concept/");

  const pageTransitionRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const isFirstPathRef = useRef(true);

  useEffect(() => {
    // The preserved proposal controls its own native iframe scrolling.
    if (isShowcaseRoute) {
      document.getElementById("header")?.classList.remove("is-hidden");
      return;
    }

    let active = true;
    const transitionEl = pageTransitionRef.current;
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
    lenisRef.current = instance;
    instance.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const lenisStateRafId = requestAnimationFrame(() => {
      setLenis(instance);
    });

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    void document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });

    let viewportWidth = window.innerWidth;
    const onResize = () => {
      // Mobile browser chrome changes the viewport height while scrolling.
      // Refreshing every trigger at that moment creates visible jumps.
      if (window.innerWidth === viewportWidth) return;
      viewportWidth = window.innerWidth;
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const onPageShow = (event: PageTransitionEvent) => {
      const navEntry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      const isBackForward = navEntry?.type === "back_forward";
      if (event.persisted || isBackForward) {
        const el = pageTransitionRef.current;
        if (el) gsap.set(el, { y: "-100%", pointerEvents: "none" });
      }
    };
    window.addEventListener("pageshow", onPageShow);
    const prevScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      active = false;
      transitionTween?.kill();
      cancelAnimationFrame(lenisStateRafId);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", onPageShow);
      window.history.scrollRestoration = prevScrollRestoration;
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenisRef.current = null;
      setLenis(null);
      gsap.ticker.remove(tickerFn);
      instance.destroy();
    };
  }, [isShowcaseRoute]);

  useLayoutEffect(() => {
    if (isFirstPathRef.current) {
      isFirstPathRef.current = false;
      return;
    }

    const l = lenisRef.current;
    if (l && !isShowcaseRoute) {
      l.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }

    if (isShowcaseRoute) return;
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(rafId);
  }, [pathname, isShowcaseRoute]);

  return (
    <LenisContext.Provider value={isShowcaseRoute ? null : lenis}>
      <CursorProvider>
        <BlurScrollRoot>
          <div
            ref={pageTransitionRef}
            className="mxd-page-transition"
            style={{ transform: "translateY(-100%)", pointerEvents: "none" }}
            aria-hidden
          />
          {!isShowcaseRoute && <CustomCursor />}
          {children}
        </BlurScrollRoot>
      </CursorProvider>
    </LenisContext.Provider>
  );
}
