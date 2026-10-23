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
        fill="currentColor"
        d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v7A2.5 2.5 0 0 1 16.5 15H12l-3.6 3.2c-.7.6-1.8.1-1.8-.8V15H7.5A2.5 2.5 0 0 1 5 12.5v-7Z"
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

export const CHAT_ICON_MARKUP = `<svg class="md-chat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v7A2.5 2.5 0 0 1 16.5 15H12l-3.6 3.2c-.7.6-1.8.1-1.8-.8V15H7.5A2.5 2.5 0 0 1 5 12.5v-7Z"/></svg>`;
