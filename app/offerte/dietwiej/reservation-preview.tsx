import styles from "@/components/showcase/proposal.module.css";
import ShowcaseBrowserDemo from "@/components/showcase/ShowcaseBrowserDemo";
import { isAllowedShowcaseUrl } from "@/lib/showcase/iframe";

const previewUrl = "/previews/die-twie/index.html";
const liveUrl = "https://www.dietwie.nl/";

export function ReservationPreview() {
  return (
    <div
      className={styles.page}
      data-type="concept"
      style={{ minHeight: "unset", overflow: "visible" }}
    >
      <section className="showcase-section showcase-demo">
        <ShowcaseBrowserDemo
          compactToolbar
          slug="dietwiej"
          title="Gastrobar Die Twie — websiteontwerp"
          demoUrl={liveUrl}
          previewUrl={previewUrl}
          externalUrl={liveUrl}
          allowed={isAllowedShowcaseUrl(previewUrl)}
          allowInteraction
          height={560}
          showcaseType="concept"
        />
      </section>
    </div>
  );
}
