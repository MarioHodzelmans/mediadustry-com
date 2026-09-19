export type ShowcaseType = "case" | "concept" | "demo";

export type ShowcaseTheme = {
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  surface: string;
  headingFont?: string;
  bodyFont?: string;
  radius?: string;
  direction?: "light" | "dark";
};

type BaseBlock = { id?: string; eyebrow?: string; title?: string };
export type ShowcaseBlock =
  | (BaseBlock & { type: "hero"; lead?: string; image?: string; imageAlt?: string; meta?: string[] })
  | (BaseBlock & { type: "intro" | "statement" | "problem" | "solution"; body: string; aside?: string })
  | (BaseBlock & { type: "image"; image: string; alt: string; caption?: string })
  | (BaseBlock & { type: "gallery"; images: { src: string; alt: string; caption?: string }[] })
  | (BaseBlock & { type: "browserDemo"; demoUrl: string; externalUrl?: string; height?: number; allowInteraction?: boolean })
  | (BaseBlock & { type: "mobileDemo"; demoUrl: string; externalUrl?: string })
  | (BaseBlock & { type: "beforeAfter"; before: { src: string; alt: string }; after: { src: string; alt: string } })
  | (BaseBlock & { type: "services" | "process" | "timeline" | "options"; items: { title: string; text?: string; meta?: string }[] })
  | (BaseBlock & { type: "results"; items: { value: string; label: string }[] })
  | (BaseBlock & { type: "testimonial"; quote: string; person: string; role?: string })
  | (BaseBlock & { type: "pricing"; amount: string; label: string; note?: string; items?: string[] })
  | (BaseBlock & { type: "acceptance"; label?: string; note?: string })
  | (BaseBlock & { type: "cta"; body?: string; label: string; href: string });

export type Showcase = {
  slug: string;
  type: ShowcaseType;
  client: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  category: string;
  year: string;
  theme: ShowcaseTheme;
  seo: { title: string; description: string; noindex?: boolean };
  proposal?: { proposalId: string; version: number; createdAt: string; validUntil: string };
  blocks: ShowcaseBlock[];
};
