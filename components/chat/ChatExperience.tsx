"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { ChatBubble } from "./ChatBubble";

type PanelProps = {
  open: boolean;
  onClose: () => void;
};

type ChatExperienceProps = {
  initialOpen?: boolean;
  Panel: ComponentType<PanelProps>;
};

export function ChatExperience({
  initialOpen = false,
  Panel,
}: ChatExperienceProps) {
  const [open, setOpen] = useState(initialOpen);
  const [activated, setActivated] = useState(initialOpen);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(initialOpen);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    launcherRef.current
      ?.closest(".md-chat-root")
      ?.classList.toggle("is-open", open);
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = launcherRef.current?.closest<HTMLElement>(".md-chat-root");
    if (!root) return;
    const dialog = root;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [
        ...dialog.querySelectorAll<HTMLElement>("button, textarea, a[href]"),
      ].filter((element) => !element.closest("[hidden]"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  return (
    <>
      {activated ? <Panel open={open} onClose={close} /> : null}
      <ChatBubble
        open={open}
        buttonRef={launcherRef}
        onClick={() => {
          setActivated(true);
          setOpen((value) => !value);
        }}
      />
    </>
  );
}
