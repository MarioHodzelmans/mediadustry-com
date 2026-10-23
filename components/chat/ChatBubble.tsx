import type { Ref } from "react";
import { ChatIcon, CloseIcon } from "./icons";

type ChatBubbleProps = {
  open: boolean;
  idle: boolean;
  showTeaser: boolean;
  busy?: boolean;
  buttonRef?: Ref<HTMLButtonElement>;
  onClick: () => void;
  onDismissTeaser: () => void;
};

export function ChatBubble({
  open,
  idle,
  showTeaser,
  busy = false,
  buttonRef,
  onClick,
  onDismissTeaser,
}: ChatBubbleProps) {
  return (
    <div className={`md-chat-dock${idle ? " is-idle" : ""}`}>
      {showTeaser ? (
        <div className="md-chat-teaser" role="status">
          <span className="md-chat-teaser-mark" aria-hidden="true" />
          <p>Vraag het onze AI-assistent</p>
          <button
            type="button"
            className="md-chat-teaser-dismiss"
            aria-label="Verberg de chatuitnodiging"
            onClick={onDismissTeaser}
          >
            <CloseIcon />
          </button>
        </div>
      ) : null}
      <span className="md-chat-launcher-lift">
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
      </span>
    </div>
  );
}
