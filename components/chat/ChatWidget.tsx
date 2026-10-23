"use client";

import "../../public/chat/chat.css";
import dynamic from "next/dynamic";
import { ChatExperience } from "./ChatExperience";

const ChatPanel = dynamic(() => import("./ChatPanel"), {
  ssr: false,
  loading: () => (
    <div className="md-chat-panel" role="status">
      <p className="md-chat-note">De chat wordt geladen…</p>
    </div>
  ),
});

export function ChatWidget() {
  return (
    <div id="md-chat-root" className="md-chat-root">
      <ChatExperience Panel={ChatPanel} />
    </div>
  );
}
