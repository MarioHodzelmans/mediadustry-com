"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  demoUrl: string;
  externalUrl: string;
  title: string;
  height: number;
  allowInteraction: boolean;
  allowed: boolean;
  slug: string;
  showcaseType: string;
};

export default function ShowcaseBrowserDemo(props: Props) {
  const [frameReady, setFrameReady] = useState(false);
  const [activePreview, setActivePreview] = useState<"desktop" | "mobile" | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mobileIframeRef = useRef<HTMLIFrameElement>(null);
  const pausedRef = useRef(false);
  const tourInteractingRef = useRef(false);
  const tourPlayedRef = useRef(false);
  const [tourReady, setTourReady] = useState(false);
  const [tourCursor, setTourCursor] = useState({ x: 28, y: 120, visible: false, clicking: false });

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !frameReady || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrame = 0;
    let lastTime = performance.now();
    const holdUntil = lastTime + 1400;
    let completed = false;
    let returnTimer = 0;
    let readyTimer = 0;

    const animate = (time: number) => {
      animationFrame = window.requestAnimationFrame(animate);
      const elapsed = Math.min(time - lastTime, 50);
      lastTime = time;
      if (completed || pausedRef.current || tourInteractingRef.current || document.hidden || time < holdUntil) return;

      try {
        const previewWindow = iframe.contentWindow;
        const previewDocument = iframe.contentDocument;
        if (!previewWindow || !previewDocument) return;
        const root = previewDocument.documentElement;
        const body = previewDocument.body;
        const maxScroll = Math.max(root.scrollHeight, body?.scrollHeight ?? 0) - previewWindow.innerHeight;
        if (maxScroll < 20) return;

        const next = previewWindow.scrollY + elapsed * 0.11;
        if (next >= maxScroll) {
          previewWindow.scrollTo(0, maxScroll);
          completed = true;
          returnTimer = window.setTimeout(() => previewWindow.scrollTo({ top: 0, behavior: "smooth" }), 1600);
          readyTimer = window.setTimeout(() => {
            if (!tourPlayedRef.current) {
              tourPlayedRef.current = true;
              setTourReady(true);
            }
          }, 3900);
        } else {
          previewWindow.scrollTo(0, next);
        }
      } catch {
        window.cancelAnimationFrame(animationFrame);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(returnTimer);
      window.clearTimeout(readyTimer);
    };
  }, [frameReady]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !frameReady || !tourReady || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    const later = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };
    const target = (selector: string) => {
      try {
        const element = iframe.contentDocument?.querySelector<HTMLElement>(selector);
        if (!element) return null;
        const elementRect = element.getBoundingClientRect();
        const iframeRect = iframe.getBoundingClientRect();
        const browserRect = iframe.closest<HTMLElement>(".showcase-browser")?.getBoundingClientRect();
        if (!browserRect) return null;
        return {
          element,
          x: iframeRect.left - browserRect.left + elementRect.left + elementRect.width / 2,
          y: iframeRect.top - browserRect.top + elementRect.top + elementRect.height / 2,
        };
      } catch {
        return null;
      }
    };
    const moveTo = (selector: string) => {
      const hit = target(selector);
      if (hit) setTourCursor({ x: hit.x, y: hit.y, visible: true, clicking: false });
      return hit;
    };
    const click = (selector: string) => {
      if (pausedRef.current) return;
      const hit = target(selector);
      if (!hit) return;
      setTourCursor({ x: hit.x, y: hit.y, visible: true, clicking: true });
      hit.element.click();
      later(() => setTourCursor((cursor) => ({ ...cursor, clicking: false })), 320);
    };

    tourInteractingRef.current = true;
    // After the full desktop tour: demonstrate the menu, then move the separate mobile preview.
    later(() => moveTo(".mxd-menu__hamburger"), 500);
    later(() => click(".mxd-menu__hamburger"), 1650);
    later(() => click(".mxd-menu__hamburger"), 3300);
    later(() => setTourCursor((cursor) => ({ ...cursor, visible: false })), 4300);
    later(() => {
      const mobileFrame = mobileIframeRef.current;
      if (mobileFrame) {
        const previewDocument = mobileFrame.contentDocument;
        const previewWindow = mobileFrame.contentWindow;
        if (previewDocument && previewWindow) {
          const maxScroll = Math.max(previewDocument.documentElement.scrollHeight, previewDocument.body?.scrollHeight ?? 0) - previewWindow.innerHeight;
          previewWindow.scrollTo({ top: maxScroll * 0.55, behavior: "smooth" });
        }
      }
    }, 5400);
    later(() => {
      mobileIframeRef.current?.contentWindow?.scrollTo({ top: 0, behavior: "smooth" });
      tourInteractingRef.current = false;
    }, 9200);

    return () => {
      timers.forEach(window.clearTimeout);
      tourInteractingRef.current = false;
    };
  }, [frameReady, tourReady]);

  const iframe = (className?: string, automated = false) =>
    props.allowed ? (
      <iframe
        ref={automated ? iframeRef : undefined}
        className={className}
        src={props.demoUrl}
        title={props.title}
        loading="lazy"
        onLoad={automated ? () => setFrameReady(true) : undefined}
        tabIndex={props.allowInteraction ? 0 : -1}
        aria-hidden={!props.allowInteraction}
        scrolling="yes"
      />
    ) : (
      <div className="showcase-demo-fallback">
        <p>Deze interactieve preview kan niet veilig worden ingesloten.</p>
        <a href={props.externalUrl} target="_blank" rel="noreferrer">Open interactief concept ↗</a>
      </div>
    );

  return (
    <div className="showcase-preview-grid">
      <section className="showcase-preview-column showcase-preview-column--desktop">
        <header className="showcase-preview-label">
          <svg viewBox="0 0 40 32" aria-hidden="true"><rect x="2" y="2" width="36" height="23" rx="1" /><path d="M13 30h14M20 25v5" /></svg>
          <span>Desktop</span>
        </header>
        <div
          className="showcase-browser"
          style={{ minHeight: props.height }}
          onPointerEnter={() => { pausedRef.current = true; }}
          onPointerLeave={() => { pausedRef.current = false; }}
          onFocusCapture={() => { pausedRef.current = true; }}
          onBlurCapture={() => { pausedRef.current = false; }}
        >
          <div className={`showcase-browser__stage${activePreview === "desktop" ? " is-interactive" : ""}`}>
            {iframe("showcase-browser__frame", true)}
            {activePreview !== "desktop" ? (
              <button className="showcase-preview-activate" type="button" onClick={() => setActivePreview("desktop")}>
                <span>Bedien desktopwebsite</span><small>Klik en scroll daarna in dit venster</small>
              </button>
            ) : (
              <button className="showcase-preview-release" type="button" onClick={() => setActivePreview(null)}>Scroll hoofdpagina ↑</button>
            )}
          </div>
          <span
            className={`showcase-tour-cursor${tourCursor.visible ? " is-visible" : ""}${tourCursor.clicking ? " is-clicking" : ""}`}
            style={{ transform: `translate3d(${tourCursor.x}px, ${tourCursor.y}px, 0)` }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 30 36"><path d="M2 2v27l7-7 5 12 5-2-5-12h10L2 2Z" /></svg>
          </span>
        </div>
      </section>

      <section className="showcase-preview-column showcase-preview-column--mobile">
        <header className="showcase-preview-label">
          <svg viewBox="0 0 24 40" aria-hidden="true"><rect x="2" y="2" width="20" height="36" rx="2" /><path d="M9 34h6" /></svg>
          <span>Mobiel</span>
        </header>
        <div className={`showcase-mobile-browser${activePreview === "mobile" ? " is-interactive" : ""}`}>
          {props.allowed ? (
            <iframe
              ref={mobileIframeRef}
              src={props.demoUrl}
              title={`${props.title} — mobiele weergave`}
              loading="lazy"
              tabIndex={props.allowInteraction ? 0 : -1}
              scrolling="yes"
            />
          ) : (
            <div className="showcase-demo-fallback"><p>Mobiele preview niet beschikbaar.</p></div>
          )}
          {activePreview !== "mobile" ? (
            <button className="showcase-preview-activate" type="button" onClick={() => setActivePreview("mobile")}>
              <span>Bedien mobiele website</span><small>Klik en swipe daarna in de telefoon</small>
            </button>
          ) : (
            <button className="showcase-preview-release" type="button" onClick={() => setActivePreview(null)}>Scroll hoofdpagina ↑</button>
          )}
        </div>
      </section>
    </div>
  );
}
