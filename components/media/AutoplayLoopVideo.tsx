"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type Ref,
  type VideoHTMLAttributes,
} from "react";
import { usePathname } from "next/navigation";

export type AutoplayVideoSource = {
  src: string;
  type: string;
};

/** Next.js serves `public/` at `/`; relative `video/...` breaks on nested routes. */
export function toPublicMediaUrl(path: string): string {
  if (!path) return path;
  if (
    path.startsWith("/") ||
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }
  return path.startsWith("video/")
    ? `/${path}`
    : `/${path.replace(/^\.\//, "")}`;
}

export type AutoplayLoopVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "muted" | "loop" | "playsInline" | "children"
> & {
  sources: AutoplayVideoSource[];
  activation?: "visible" | "interaction" | "immediate";
  children?: ReactNode;
};

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(value);
  } else {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

/**
 * Background / loop videos: valid boolean props, root-relative URLs, and a guarded
 * `play()` so autoplay works after hydration and when returning to the tab (mobile/desktop).
 */
const AutoplayLoopVideo = forwardRef<HTMLVideoElement, AutoplayLoopVideoProps>(
  function AutoplayLoopVideo(
    {
      sources,
      activation = "visible",
      className,
      poster,
      preload = "none",
      children,
      ...rest
    },
    forwardedRef,
  ) {
    const innerRef = useRef<HTMLVideoElement>(null);
    const [isActive, setIsActive] = useState(activation === "immediate");
    const pathname = usePathname();

    const setVideoRef = useCallback(
      (node: HTMLVideoElement | null) => {
        innerRef.current = node;
        assignRef(forwardedRef, node);
      },
      [forwardedRef],
    );

    const posterUrl =
      poster != null ? toPublicMediaUrl(String(poster)) : undefined;
    const normSources = sources.map((s) => ({
      ...s,
      src: toPublicMediaUrl(s.src),
    }));

    useEffect(() => {
      if (isActive || activation === "immediate") return;

      if (activation === "interaction") {
        const activate = () => setIsActive(true);
        const events: Array<keyof WindowEventMap> = [
          "pointerdown",
          "touchstart",
          "keydown",
          "scroll",
        ];
        events.forEach((event) =>
          window.addEventListener(event, activate, { passive: true, once: true }),
        );
        return () => events.forEach((event) => window.removeEventListener(event, activate));
      }

      const video = innerRef.current;
      if (!video) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsActive(true);
            observer.disconnect();
          }
        },
        { rootMargin: "200px" },
      );
      observer.observe(video);
      return () => observer.disconnect();
    }, [activation, isActive]);

    useEffect(() => {
      if (!isActive) return;
      const v = innerRef.current;
      if (!v) return;
      const tryPlay = () => {
        void v.play().catch(() => {});
      };
      tryPlay();
      v.addEventListener("canplay", tryPlay);
      const onVis = () => {
        if (document.visibilityState === "visible") tryPlay();
      };
      document.addEventListener("visibilitychange", onVis);
      return () => {
        v.removeEventListener("canplay", tryPlay);
        document.removeEventListener("visibilitychange", onVis);
      };
    }, [isActive]);

    useEffect(() => {
      const v = innerRef.current;
      if (!v || !isActive) return;
      // Soft navigations can leave loop videos paused/not initialized.
      v.load();
      void v.play().catch(() => {});
    }, [isActive, pathname]);

    if (activation === "interaction" && !isActive) {
      return (
        <div
          className={`${className ?? ""} mxd-video-poster`}
          style={{ backgroundImage: posterUrl ? `url("${posterUrl}")` : undefined }}
          aria-hidden="true"
        />
      );
    }

    return (
      <video
        ref={setVideoRef}
        className={className}
        poster={posterUrl}
        preload={preload}
        autoPlay={isActive}
        muted
        loop
        playsInline
        {...rest}
      >
        {isActive && normSources.map((s) => (
          <source key={`${s.src}-${s.type}`} src={s.src} type={s.type} />
        ))}
        {children}
      </video>
    );
  },
);

export default AutoplayLoopVideo;
