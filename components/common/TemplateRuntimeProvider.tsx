"use client";

import { type ReactNode } from "react";
import { LenisContext } from "@/components/common/LenisContext";
import BlurScrollRoot from "@/components/animations/BlurScrollRoot";
import { CursorProvider } from "@/components/cursor/CursorContext";

export default function TemplateRuntimeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LenisContext.Provider value={null}>
      <CursorProvider>
        <BlurScrollRoot>
          {children}
        </BlurScrollRoot>
      </CursorProvider>
    </LenisContext.Provider>
  );
}
