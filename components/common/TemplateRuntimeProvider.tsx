"use client";

import {
  lazy,
  Suspense,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { useViewportHeight } from "@/hooks/useViewportHeight";
import { LenisContext } from "@/components/common/LenisContext";
import BlurScrollRoot from "@/components/animations/BlurScrollRoot";
import { CursorProvider } from "@/components/cursor/CursorContext";

const LegacyMotionRuntime = lazy(() => import("./LegacyMotionRuntime"));

// Add new template examples explicitly; public pages and unknown URLs stay native.
// In particular, the root 404 must never inherit the template's 360px minimum.
const LEGACY_ROUTES = new Set([
  "/404",
  "/about-me",
  "/about-us",
  "/blog-article",
  "/blog-creative",
  "/blog-standard",
  "/contact",
  "/faq",
  "/index-branding-studio",
  "/index-creative-agency",
  "/index-design-studio",
  "/index-digital-designer",
  "/index-freelancer-portfolio",
  "/index-personal-portfolio",
  "/index-software-development-company",
  "/index-web-developer",
  "/index-web-studio",
  "/preview",
  "/pricing",
  "/project-details",
  "/services",
  "/team",
  "/works-default",
  "/works-grid",
  "/works-grid-sticky",
]);

function usesNativeScroll(pathname: string): boolean {
  return !LEGACY_ROUTES.has(pathname);
}

export default function TemplateRuntimeProvider({
  children,
}: {
  children: ReactNode;
}) {
  useViewportHeight();
  const pathname = usePathname();
  const nativeScroll = usesNativeScroll(pathname);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const previousPathRef = useRef(pathname);

  useLayoutEffect(() => {
    const hasNavigated = previousPathRef.current !== pathname;
    previousPathRef.current = pathname;
    if (!nativeScroll) return;

    document.getElementById("header")?.classList.remove("is-hidden");
    if (hasNavigated) window.scrollTo(0, 0);
  }, [pathname, nativeScroll]);

  return (
    <LenisContext.Provider value={nativeScroll ? null : lenis}>
      <CursorProvider>
        <BlurScrollRoot>
          {!nativeScroll && (
            <>
              {/* A plain link is removed on navigation; hoisted CSS would persist. */}
              {/* eslint-disable-next-line @next/next/no-css-tags -- Keep the legacy stylesheet removable across route changes. */}
              <link
                id="mxd-legacy-styles"
                rel="stylesheet"
                href="/css/legacy-template.css"
              />
              <Suspense fallback={null}>
                <LegacyMotionRuntime onLenisChange={setLenis} />
              </Suspense>
            </>
          )}
          {children}
        </BlurScrollRoot>
      </CursorProvider>
    </LenisContext.Provider>
  );
}
