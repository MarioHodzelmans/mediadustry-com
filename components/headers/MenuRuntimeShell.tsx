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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.body.classList.add("menu-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      <NavTrigger isOpen={isOpen} onToggle={toggleMenu} />
      <Nav isOpen={isOpen} onClose={closeMenu} />
    </>
  );
}
