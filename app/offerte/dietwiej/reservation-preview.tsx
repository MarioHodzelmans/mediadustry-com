import styles from "@/components/showcase/proposal.module.css";
import ShowcaseBrowserDemo from "@/components/showcase/ShowcaseBrowserDemo";
import { isAllowedShowcaseUrl } from "@/lib/showcase/iframe";

const conceptUrl =
  "https://gastrobar-die-twie.chatgpt-busi-7152.chatgpt.site/?v=9";

export function ReservationPreview() {
  return (
    <div
      className={styles.page}
      data-type="concept"
      style={{ minHeight: "unset", overflow: "visible" }}
    >
      <p className={styles.conceptNotice}>
        Interactief conceptvoorbeeld · inhoud en reserveringen zijn nog niet
        definitief.
      </p>
      <section className="showcase-section showcase-demo">
        <ShowcaseBrowserDemo
          compactToolbar
          slug="dietwiej"
          title="Gastrobar Die Twie — websiteontwerp"
          demoUrl={conceptUrl}
          externalUrl={conceptUrl}
          allowed={isAllowedShowcaseUrl(conceptUrl)}
          allowInteraction
          height={560}
          showcaseType="concept"
        />
      </section>
    </div>
  );
}
