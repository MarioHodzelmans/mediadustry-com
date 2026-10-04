"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

// Menu cleanup may run after runtime teardown; never restart a destroyed instance.
export const activeManagedLenis = new WeakSet<Lenis>();

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
