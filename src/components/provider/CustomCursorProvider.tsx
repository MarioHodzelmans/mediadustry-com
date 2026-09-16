"use client";
import { useCursorAndBackground } from "@/hooks/useCursorAndBackground";
import { ReactNode } from "react";

type CustomCursorProviderProps = {
  children: ReactNode;
  bgColor?: string; 
  customClass?:string
};

export default function CursorAndBackgroundProvider({ children, bgColor, customClass }: CustomCursorProviderProps) {
  useCursorAndBackground({ bgColor, customClass}); 
  return <>{children}</>;
}