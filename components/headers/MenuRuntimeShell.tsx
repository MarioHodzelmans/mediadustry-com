"use client";

import { useCallback, useEffect, useState } from "react";
import Nav from "@/components/headers/Nav";
import NavTrigger from "@/components/headers/NavTrigger";
import { activeManagedLenis, useLenis } from "@/components/common/LenisContext";

export default function MenuRuntimeShell() {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  useEffect(() => {
    if (!isOpen || !lenis) return;
    const wasStopped = lenis.isStopped;
    lenis.stop();
    return () => {
      if (!wasStopped && activeManagedLenis.has(lenis)) lenis.start();
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    if (!isOpen) return;
    const menu = document.getElementById("site-menu");
    const returnFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const background = [
      document.getElementById("site-content"),
      document.getElementById("header"),
    ].filter((element): element is HTMLElement => Boolean(element));
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      const padding =
        parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${padding + scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open");

    const focusable = () =>
      Array.from(
        menu?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex="0"]',
        ) ?? [],
      );
    focusable()[0]?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      } else if (event.key === "Tab") {
        const elements = focusable();
        const first = elements[0];
        const last = elements.at(-1);
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !menu?.contains(document.activeElement))
        ) {
          event.preventDefault();
          last?.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            !menu?.contains(document.activeElement))
        ) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", closeMenu);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      document.body.classList.remove("menu-open");
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", closeMenu);
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      <NavTrigger isOpen={isOpen} onToggle={toggleMenu} />
      <Nav isOpen={isOpen} onClose={closeMenu} />
    </>
  );
}
