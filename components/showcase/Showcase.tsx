import type { CSSProperties } from "react";
import type { Showcase as ShowcaseData } from "@/lib/showcase/types";
import ShowcaseBlocks from "./ShowcaseBlocks";
import styles from "./showcase.module.css";

export default function Showcase({ showcase }: { showcase: ShowcaseData }) {
  const theme = {
    "--showcase-bg": showcase.theme.background,
    "--showcase-fg": showcase.theme.foreground,
    "--showcase-accent": showcase.theme.accent,
    "--showcase-muted": showcase.theme.muted,
    "--showcase-surface": showcase.theme.surface,
    "--showcase-heading": showcase.theme.headingFont ?? "var(--font-manrope)",
    "--showcase-body": showcase.theme.bodyFont ?? "var(--font-manrope)",
    "--showcase-radius": showcase.theme.radius ?? "0px",
  } as CSSProperties;

  return (
    <main className={`${styles.page} showcase-page`} style={theme} data-direction={showcase.theme.direction} data-type={showcase.type}>
      <ShowcaseBlocks showcase={showcase} />
      {showcase.type === "concept" && (
        <a
          className="showcase-floating-accept"
          href={`mailto:info@mediadustry.com?subject=${encodeURIComponent(`Akkoord websitevoorstel ${showcase.client}`)}`}
        >
          <span>Ik ga direct akkoord</span>
          <i aria-hidden="true">↗</i>
        </a>
      )}
      <footer className="showcase-footer"><span>{showcase.client} × MEDIADUSTRY</span><span>© 2026</span></footer>
    </main>
  );
}
