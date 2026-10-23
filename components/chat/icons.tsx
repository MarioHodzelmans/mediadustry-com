import type { ReactNode } from "react";

type IconProps = { className?: string };

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className ?? "md-chat-icon"}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function ChatIcon() {
  return (
    <Icon>
      <path
        className="md-chat-mark-bubble"
        fill="currentColor"
        d="M4.2 6.4A2.2 2.2 0 0 1 6.4 4.2h8.1a2.2 2.2 0 0 1 2.2 2.2v5.4a2.2 2.2 0 0 1-2.2 2.2h-3.1L9.2 16.6c-.62.52-1.6.08-1.6-.72v-1.6H6.4a2.2 2.2 0 0 1-2.2-2.2V6.4Z"
      />
      <path
        className="md-chat-mark-spark"
        fill="currentColor"
        d="M18.7 2.2l.48 1.22 1.22.48-1.22.48-.48 1.22-.48-1.22-1.22-.48 1.22-.48.48-1.22Z"
      />
      <path
        className="md-chat-mark-spark"
        fill="currentColor"
        d="M16.15 5.05l.28.7.7.28-.7.28-.28.7-.28-.7-.7-.28.7-.28.28-.7Z"
      />
    </Icon>
  );
}

export function CloseIcon() {
  return (
    <Icon>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M6 6l12 12M18 6 6 18"
      />
    </Icon>
  );
}

export function MicIcon() {
  return (
    <Icon>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        d="M12 4.5a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-5 0V7A2.5 2.5 0 0 1 12 4.5Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        d="M7 11a5 5 0 0 0 10 0M12 16v3.5M9 19.5h6"
      />
    </Icon>
  );
}

export function SpeakerIcon() {
  return (
    <Icon>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 10h2.5L11 7v10l-3.5-3H5v-4Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        d="M15 9.5a3.5 3.5 0 0 1 0 5M17.2 7.2a6.2 6.2 0 0 1 0 9.6"
      />
    </Icon>
  );
}

export function StopIcon() {
  return (
    <Icon>
      <rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor" />
    </Icon>
  );
}

export const CHAT_ICON_MARKUP = `<svg class="md-chat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="md-chat-mark-bubble" fill="currentColor" d="M4.2 6.4A2.2 2.2 0 0 1 6.4 4.2h8.1a2.2 2.2 0 0 1 2.2 2.2v5.4a2.2 2.2 0 0 1-2.2 2.2h-3.1L9.2 16.6c-.62.52-1.6.08-1.6-.72v-1.6H6.4a2.2 2.2 0 0 1-2.2-2.2V6.4Z"/><path class="md-chat-mark-spark" fill="currentColor" d="M18.7 2.2l.48 1.22 1.22.48-1.22.48-.48 1.22-.48-1.22-1.22-.48 1.22-.48.48-1.22Z"/><path class="md-chat-mark-spark" fill="currentColor" d="M16.15 5.05l.28.7.7.28-.7.28-.28.7-.28-.7-.7-.28.7-.28.28-.7Z"/></svg>`;
