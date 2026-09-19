export type ShowcaseEvent =
  | "showcase_view"
  | "showcase_demo_open"
  | "showcase_demo_fullscreen"
  | "showcase_pricing_view"
  | "showcase_accept_click";

export function trackShowcaseEvent(
  event: ShowcaseEvent,
  metadata: { showcase_slug: string; showcase_type: string },
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("mediadustry:analytics", { detail: { event, ...metadata } }));
}

export async function createProposalCheckout(): Promise<never> {
  throw new Error("Proposal checkout is not connected yet.");
}
