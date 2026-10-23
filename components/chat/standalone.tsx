import { createRoot, type Root } from "react-dom/client";
import { ChatExperience } from "./ChatExperience";
import ChatPanel from "./ChatPanel";

let root: Root | null = null;

export function mountChatWidget(element: HTMLElement) {
  element.classList.add("md-chat-root", "is-open");
  root ??= createRoot(element);
  root.render(<ChatExperience initialOpen Panel={ChatPanel} />);
}
