"use client";

import { useCallback, useEffect, useState } from "react";
import Nav from "@/components/headers/Nav";
import NavTrigger from "@/components/headers/NavTrigger";

export default function MenuRuntimeShell() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  useEffect(() => {
    if (!isOpen) return;
    const menu = document.getElementById("site-menu");
    if (!menu) return;
    const previouslyFocused = document.activeElement;
    const background = Array.from(document.body.children)
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement &&
          !element.contains(menu) &&
          !["SCRIPT", "STYLE", "LINK"].includes(element.tagName),
      )
      .map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => {
      element.inert = true;
    });
    const focusable = () =>
      Array.from(
        menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
    focusable()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
      if (event.key === "Tab") {
        const items = focusable();
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.body.classList.add("menu-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
      background.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      if (previouslyFocused instanceof HTMLElement)
        previouslyFocused.focus({ preventScroll: true });
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      <NavTrigger isOpen={isOpen} onToggle={toggleMenu} />
      <Nav isOpen={isOpen} onClose={closeMenu} />
    </>
  );
}
