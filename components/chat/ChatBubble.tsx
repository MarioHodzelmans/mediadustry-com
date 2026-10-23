import type { Ref } from "react";
import { ChatIcon, CloseIcon } from "./icons";

type ChatBubbleProps = {
  open: boolean;
  busy?: boolean;
  buttonRef?: Ref<HTMLButtonElement>;
  onClick: () => void;
};

export function ChatBubble({
  open,
  busy = false,
  buttonRef,
  onClick,
}: ChatBubbleProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className="md-chat-launcher"
      aria-label={open ? "Sluit chat" : "Chat met MEDIADUSTRY"}
      aria-expanded={open}
      aria-controls="md-chat-panel"
      aria-busy={busy || undefined}
      onClick={onClick}
    >
      {open ? <CloseIcon /> : <ChatIcon />}
    </button>
  );
}
