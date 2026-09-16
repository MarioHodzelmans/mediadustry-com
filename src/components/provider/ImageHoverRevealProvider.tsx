"use client";
import { useImageHoverReveal } from "@/hooks/useRevealOnHover";
import { ReactNode } from "react";

export default function ImageHoverRevealProvider({ children }: { children: ReactNode }) {
    useImageHoverReveal();
    return <>{children}</>;
}
