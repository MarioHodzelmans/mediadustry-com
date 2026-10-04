"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import ArrowIcon from "@/components/brand/ArrowIcon";

type Device = "desktop" | "mobile";
type Props = {
  demoUrl: string;
  previewUrl?: string;
  externalUrl: string;
  title: string;
  height: number;
  allowInteraction: boolean;
  allowed: boolean;
  slug: string;
  showcaseType: string;
};
const dimensions = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 780 },
};
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(notify: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
function previewDocument(frame: HTMLIFrameElement | null) {
  try {
    return frame?.contentDocument || null;
  } catch {
    return null;
  }
}

export default function ShowcaseBrowserDemo(props: Props) {
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => true,
  );
  const [activePreview, setActivePreview] = useState<Device | null>(null);
  const [tourEnabled, setTourEnabled] = useState(true);
  const [tourId, setTourId] = useState(0);
  const [ready, setReady] = useState({ desktop: 0, mobile: 0 });
  const [finished, setFinished] = useState({ desktop: false, mobile: false });
  const [scales, setScales] = useState({ desktop: 1, mobile: 1 });
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const frames = useRef<Record<Device, HTMLIFrameElement | null>>({
    desktop: null,
    mobile: null,
  });
  const stages = useRef<Record<Device, HTMLDivElement | null>>({
    desktop: null,
    mobile: null,
  });
  const cursors = useRef<Record<Device, HTMLSpanElement | null>>({
    desktop: null,
    mobile: null,
  });
  const activationButtons = useRef<Record<Device, HTMLButtonElement | null>>({
    desktop: null,
    mobile: null,
  });
  const dialog = useRef<HTMLDialogElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const fullscreenKeyCleanup = useRef<(() => void) | null>(null);
  const source = props.previewUrl || props.demoUrl;
  const localPreview = Boolean(props.previewUrl);
  const allFinished = finished.desktop && finished.mobile;

  useEffect(() => {
    const element = preview.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.inView = String(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    for (const device of ["desktop", "mobile"] as const) {
      const frame = frames.current[device];
      if (!frame) continue;
      const loaded = () =>
        setReady((current) => ({ ...current, [device]: current[device] + 1 }));
      frame.addEventListener("load", loaded);
      // Cached static frames can finish before React hydrates their load handlers.
      const doc = previewDocument(frame);
      if (doc?.readyState === "complete" && doc.URL !== "about:blank") loaded();
      cleanups.push(() => frame.removeEventListener("load", loaded));
    }
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [source]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const device =
          entry.target === stages.current.desktop ? "desktop" : "mobile";
        const scale = entry.contentRect.width / dimensions[device].width;
        setScales((current) =>
          Math.abs(current[device] - scale) < 0.001
            ? current
            : { ...current, [device]: scale },
        );
      }
    });
    Object.values(stages.current).forEach((stage) => {
      if (stage) observer.observe(stage);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      !localPreview ||
      !tourEnabled ||
      reducedMotion ||
      activePreview ||
      fullscreenOpen ||
      !ready.desktop ||
      !ready.mobile
    )
      return;
    const dispose: (() => void)[] = [];
    for (const device of ["desktop", "mobile"] as const) {
      const frame = frames.current[device];
      const stage = stages.current[device];
      const cursor = cursors.current[device];
      const doc = previewDocument(frame);
      const view = doc?.defaultView;
      if (!frame || !stage || !doc || !view || !cursor) continue;
      // Only the repository's local preview is controllable. Never poll an external iframe.
      if (new URL(source, location.origin).origin !== location.origin) continue;
      let request: number | null = null;
      let visible = false;
      let completed = false;
      let stepIndex = 0;
      let elapsed = 0;
      let previous: number | null = null;
      let from = 0;
      let to = 0;
      let duration = 0;
      type Step =
        | { kind: "wait"; duration: number }
        | { kind: "scroll"; target: "bottom" | "top"; duration?: number }
        | { kind: "point" | "click"; selector: string; duration: number };
      const nav = 'nav[data-preview-navigation] a[href="#parket"]';
      const menu = "[data-preview-menu-toggle]";
      const steps: Step[] = [
        { kind: "wait", duration: 700 },
        { kind: "scroll", target: "bottom" },
        { kind: "wait", duration: 700 },
        { kind: "scroll", target: "top", duration: 1400 },
        {
          kind: "point",
          selector: device === "desktop" ? nav : menu,
          duration: 650,
        },
        {
          kind: "click",
          selector: device === "desktop" ? nav : menu,
          duration: 900,
        },
        ...(device === "mobile"
          ? [
              { kind: "point" as const, selector: nav, duration: 650 },
              { kind: "click" as const, selector: nav, duration: 900 },
            ]
          : []),
        { kind: "scroll", target: "top", duration: 1000 },
      ];
      view.scrollTo({ top: 0, behavior: "instant" });
      const menuButton = doc.querySelector<HTMLButtonElement>(menu);
      if (menuButton?.getAttribute("aria-expanded") === "true")
        menuButton.click();
      function point(selector: string, click = false) {
        const target = doc!.querySelector<HTMLElement>(selector);
        if (!target) return;
        const rect = target.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const scale = stage!.clientWidth / dimensions[device].width;
        cursor!.style.transform = `translate3d(${(rect.left + rect.width / 2) * scale}px, ${(rect.top + rect.height / 2) * scale}px, 0)`;
        cursor!.classList.add("is-visible");
        cursor!.classList.toggle("is-clicking", click);
        // The tour can only open the preview menu or follow an in-page section link.
        if (
          click &&
          (target.hasAttribute("data-preview-menu-toggle") ||
            target.getAttribute("href")?.startsWith("#"))
        )
          target.click();
      }
      function beginStep() {
        const step = steps[stepIndex];
        elapsed = 0;
        previous = null;
        if (!step) {
          completed = true;
          cursor!.classList.remove("is-visible", "is-clicking");
          setFinished((current) => ({ ...current, [device]: true }));
          stage!.dataset.tour = "complete";
          return;
        }
        if (step.kind === "scroll") {
          cursor!.classList.remove("is-visible", "is-clicking");
          from = view!.scrollY;
          to =
            step.target === "top"
              ? 0
              : Math.max(
                  0,
                  doc!.documentElement.scrollHeight - view!.innerHeight,
                );
          duration =
            step.duration ||
            Math.max(4000, Math.min(22000, Math.abs(to - from) / 0.16));
        } else {
          duration = step.duration;
          if (step.kind === "point" || step.kind === "click")
            point(step.selector, step.kind === "click");
        }
      }
      function schedule() {
        if (request === null && visible && !completed && !document.hidden)
          request = requestAnimationFrame(tick);
      }
      function tick(time: number) {
        request = null;
        if (!visible || completed || document.hidden) return;
        if (previous !== null) elapsed += Math.min(time - previous, 64);
        previous = time;
        const step = steps[stepIndex];
        if (step.kind === "scroll") {
          const progress = Math.min(elapsed / duration, 1);
          const eased =
            step.target === "bottom" ? progress : 1 - (1 - progress) ** 3;
          view!.scrollTo({
            top: from + (to - from) * eased,
            behavior: "instant",
          });
        }
        if (elapsed >= duration) {
          stepIndex += 1;
          beginStep();
        }
        schedule();
      }
      function stopFrame() {
        if (request !== null) cancelAnimationFrame(request);
        request = null;
        previous = null;
      }
      const visibility = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          stage.dataset.tour =
            visible && !completed
              ? "playing"
              : completed
                ? "complete"
                : "paused";
          if (visible) schedule();
          else stopFrame();
        },
        { threshold: 0.12 },
      );
      const pageVisibility = () => {
        if (document.hidden) stopFrame();
        else schedule();
      };
      beginStep();
      visibility.observe(stage);
      document.addEventListener("visibilitychange", pageVisibility);
      dispose.push(() => {
        stopFrame();
        visibility.disconnect();
        document.removeEventListener("visibilitychange", pageVisibility);
        cursor.classList.remove("is-visible", "is-clicking");
        stage.dataset.tour = "paused";
      });
    }
    return () => dispose.forEach((cleanup) => cleanup());
  }, [
    localPreview,
    source,
    tourEnabled,
    tourId,
    reducedMotion,
    activePreview,
    fullscreenOpen,
    ready.desktop,
    ready.mobile,
  ]);

  const releasePreview = useCallback((device: Device) => {
    setActivePreview(null);
    requestAnimationFrame(() =>
      activationButtons.current[device]?.focus({ preventScroll: true }),
    );
  }, []);

  useEffect(() => {
    if (!activePreview) return;
    const doc = previewDocument(frames.current[activePreview]);
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        releasePreview(activePreview);
      }
    };
    doc?.addEventListener("keydown", onEscape);
    return () => doc?.removeEventListener("keydown", onEscape);
  }, [activePreview, ready.desktop, ready.mobile, releasePreview]);

  useEffect(
    () => () => {
      fullscreenKeyCleanup.current?.();
      document.body.classList.remove("preview-fullscreen-open");
    },
    [],
  );

  function activate(device: Device) {
    setTourEnabled(false);
    setActivePreview(device);
    frames.current[device]?.focus({ preventScroll: true });
  }
  function closeFullscreen() {
    dialog.current?.close();
  }
  function openFullscreen() {
    setTourEnabled(false);
    setActivePreview(null);
    setFullscreenOpen(true);
    document.body.classList.add("preview-fullscreen-open");
    dialog.current?.showModal();
  }

  return (
    <div ref={preview} className="showcase-preview">
      <div className="showcase-preview-toolbar">
        <p>
          {localPreview ? "Interactief ontwerpvoorbeeld" : "Websitepreview"}
        </p>
        <div>
          {localPreview && (
            <button
              type="button"
              disabled={reducedMotion}
              onClick={() => {
                if (tourEnabled && !allFinished) setTourEnabled(false);
                else {
                  setFinished({ desktop: false, mobile: false });
                  setTourId((id) => id + 1);
                  setTourEnabled(true);
                }
              }}
            >
              {reducedMotion
                ? "Automatische demo uit"
                : tourEnabled && !allFinished
                  ? "Pauzeer demo"
                  : "Herstart demo"}
            </button>
          )}
          {props.allowed && (
            <button type="button" onClick={openFullscreen}>
              Open volledig scherm <ArrowIcon />
            </button>
          )}
          <a href={props.externalUrl} target="_blank" rel="noreferrer">
            Bekijk live website <ArrowIcon />
          </a>
        </div>
      </div>
      <div className="showcase-preview-grid">
        {(["desktop", "mobile"] as const).map((device) => (
          <section
            key={device}
            className={`showcase-preview-column showcase-preview-column--${device}`}
          >
            <header className="showcase-preview-label">
              <svg
                viewBox={device === "desktop" ? "0 0 40 32" : "0 0 24 40"}
                aria-hidden="true"
                focusable="false"
              >
                {device === "desktop" ? (
                  <>
                    <rect x="2" y="2" width="36" height="23" rx="1" />
                    <path d="M13 30h14M20 25v5" />
                  </>
                ) : (
                  <>
                    <rect x="2" y="2" width="20" height="36" rx="2" />
                    <path d="M9 34h6" />
                  </>
                )}
              </svg>
              <span>{device === "desktop" ? "Desktop" : "Mobiel"}</span>
            </header>
            <div
              className={
                device === "desktop"
                  ? "showcase-browser"
                  : "showcase-mobile-browser"
              }
            >
              <div
                ref={(element) => {
                  stages.current[device] = element;
                }}
                className={`showcase-preview-stage${activePreview === device ? " is-interactive" : ""}`}
                style={{
                  aspectRatio: `${dimensions[device].width} / ${dimensions[device].height}`,
                }}
              >
                {props.allowed ? (
                  <iframe
                    ref={(element) => {
                      frames.current[device] = element;
                    }}
                    className="showcase-preview-frame"
                    src={source}
                    title={`${props.title} — ${device === "desktop" ? "desktop" : "mobiele"} preview`}
                    loading="lazy"
                    tabIndex={activePreview === device ? 0 : -1}
                    aria-hidden={activePreview !== device}
                    style={{
                      width: dimensions[device].width,
                      height: dimensions[device].height,
                      transform: `scale(${scales[device]})`,
                    }}
                  />
                ) : (
                  <div className="showcase-demo-fallback">
                    <p>Open de website via de link hierboven.</p>
                  </div>
                )}
                {props.allowed &&
                  props.allowInteraction &&
                  activePreview !== device && (
                    <button
                      ref={(element) => {
                        activationButtons.current[device] = element;
                      }}
                      className="showcase-preview-activate"
                      type="button"
                      onClick={() => activate(device)}
                    >
                      <span>
                        {device === "desktop"
                          ? "Bedien desktopwebsite"
                          : "Bedien mobiele website"}
                      </span>
                      <small>
                        {device === "desktop"
                          ? "Klik om zelf te scrollen"
                          : "Tik om zelf te swipen"}
                      </small>
                    </button>
                  )}
                <span
                  ref={(element) => {
                    cursors.current[device] = element;
                  }}
                  className="showcase-tour-cursor"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 30 36" aria-hidden="true" focusable="false">
                    <path d="M2 2v27l7-7 5 12 5-2-5-12h10L2 2Z" />
                  </svg>
                </span>
              </div>
            </div>
            {activePreview === device && (
              <button
                type="button"
                className="showcase-preview-release"
                onClick={() => releasePreview(device)}
              >
                Terug naar voorstel{" "}
                <ArrowIcon className="showcase-arrow-down" />
              </button>
            )}
          </section>
        ))}
      </div>
      <p className="showcase-preview-note">
        {localPreview
          ? "Ontwerpvoorbeeld: de demo pauzeert wanneer je zelf de preview bedient. Gebruik ‘Bekijk live website’ voor de actuele website."
          : "Activeer een venster om de website zelf te bedienen."}
      </p>
      <dialog
        ref={dialog}
        className="showcase-preview-dialog"
        aria-labelledby={`preview-dialog-${props.slug}`}
        onClose={() => {
          setFullscreenOpen(false);
          document.body.classList.remove("preview-fullscreen-open");
          fullscreenKeyCleanup.current?.();
          fullscreenKeyCleanup.current = null;
        }}
      >
        <div className="showcase-preview-dialog__head">
          <h2 id={`preview-dialog-${props.slug}`}>{props.title}</h2>
          <button type="button" onClick={closeFullscreen}>
            Sluiten
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="m5 5 14 14M19 5 5 19"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
        {fullscreenOpen && (
          <iframe
            src={source}
            title={`${props.title} — volledig scherm`}
            onLoad={(event) => {
              const doc = previewDocument(event.currentTarget);
              const escape = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  closeFullscreen();
                }
              };
              fullscreenKeyCleanup.current?.();
              doc?.addEventListener("keydown", escape);
              fullscreenKeyCleanup.current = () =>
                doc?.removeEventListener("keydown", escape);
            }}
          />
        )}
      </dialog>
    </div>
  );
}
