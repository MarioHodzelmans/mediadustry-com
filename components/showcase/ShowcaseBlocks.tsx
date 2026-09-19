import Image from "next/image";
import Link from "next/link";
import type { Showcase, ShowcaseBlock } from "@/lib/showcase/types";
import { isAllowedShowcaseUrl } from "@/lib/showcase/iframe";
import ShowcaseBrowserDemo from "./ShowcaseBrowserDemo";

const Heading = ({ block }: { block: ShowcaseBlock }) => (
  <header className="showcase-section__head">
    {block.eyebrow && <p className="showcase-eyebrow">{block.eyebrow}</p>}
    {block.title && <h2>{block.title}</h2>}
  </header>
);

export default function ShowcaseBlocks({ showcase }: { showcase: Showcase }) {
  const proposalPrice = showcase.blocks.find(
    (block): block is Extract<ShowcaseBlock, { type: "pricing" }> => block.type === "pricing",
  );
  return (
    <>
      {showcase.blocks.map((block, index) => {
        const key = block.id ?? `${block.type}-${index}`;
        if (block.type === "hero") return (
          <section className="showcase-hero" key={key}>
            <div className="showcase-hero__copy">
              {block.eyebrow && <p className="showcase-eyebrow">{showcase.type === "concept" ? block.title : block.eyebrow}</p>}
              <h1>{showcase.type === "concept" ? <>{showcase.client} <span>× MEDIADUSTRY</span></> : (block.title ?? showcase.title)}</h1>
              {block.lead && <p className="showcase-hero__lead">{block.lead}</p>}
              {block.meta && <ul>{block.meta.map((item) => <li key={item}>{item}</li>)}</ul>}
            </div>
            {showcase.type === "concept" && proposalPrice && (
              <div className="showcase-proposal-strip">
                <div className="showcase-proposal-strip__inner">
                  <div><span>Voorstel voor</span><strong>{showcase.client}</strong></div>
                  <div><span>Investering</span><strong>{proposalPrice.amount} <small>excl. btw</small></strong></div>
                  {showcase.proposal && <div><span>Geldig t/m</span><strong>{new Date(showcase.proposal.validUntil).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}</strong></div>}
                  <a href="#concept-demo">Bekijk het concept ↓</a>
                </div>
              </div>
            )}
            {block.image && <div className="showcase-hero__media"><Image src={block.image} alt={block.imageAlt ?? ""} fill priority sizes="100vw" /></div>}
          </section>
        );
        if (["intro", "statement", "problem", "solution"].includes(block.type)) {
          const textBlock = block as Extract<ShowcaseBlock, { type: "intro" | "statement" | "problem" | "solution" }>;
          return <section className={`showcase-section showcase-copy showcase-copy--${block.type}`} key={key}><Heading block={block} /><div><p className="showcase-copy__body">{textBlock.body}</p>{textBlock.aside && <p className="showcase-copy__aside">{textBlock.aside}</p>}</div></section>;
        }
        if (block.type === "image") return <figure className="showcase-wide-image" key={key}><Image src={block.image} alt={block.alt} fill sizes="100vw" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
        if (block.type === "gallery") return <section className="showcase-section" key={key}><Heading block={block} /><div className="showcase-gallery">{block.images.map((image, i) => <figure key={image.src + i}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" />{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div></section>;
        if (block.type === "browserDemo") return <section className="showcase-section showcase-demo" id="concept-demo" key={key}>{(block.eyebrow || block.title) && <Heading block={block} />}<ShowcaseBrowserDemo demoUrl={block.demoUrl} externalUrl={block.externalUrl ?? block.demoUrl} title={block.title ?? "Live website"} height={block.height ?? 720} allowInteraction={block.allowInteraction ?? true} allowed={isAllowedShowcaseUrl(block.demoUrl)} slug={showcase.slug} showcaseType={showcase.type} /></section>;
        if (block.type === "mobileDemo") return <section className="showcase-section" key={key}><Heading block={block} /><div className="showcase-phone"><iframe src={block.demoUrl} title={block.title ?? "Mobiele demo"} loading="lazy" /></div></section>;
        if (block.type === "beforeAfter") return <section className="showcase-section" key={key}><Heading block={block} /><div className="showcase-before-after">{[block.before, block.after].map((image, i) => <figure key={image.src}><Image src={image.src} alt={image.alt} fill sizes="50vw" /><figcaption>{i ? "Na" : "Voor"}</figcaption></figure>)}</div></section>;
        if (["services", "process", "timeline", "options"].includes(block.type)) {
          const list = block as Extract<ShowcaseBlock, { type: "services" | "process" | "timeline" | "options" }>;
          return <section className={`showcase-section showcase-list showcase-list--${block.type}`} key={key}><Heading block={block} /><ol>{list.items.map((item, i) => <li key={item.title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{item.title}</h3>{item.text && <p>{item.text}</p>}{item.meta && <strong>{item.meta}</strong>}</li>)}</ol></section>;
        }
        if (block.type === "results") return <section className="showcase-section showcase-results" key={key}><Heading block={block} /><div>{block.items.map((item) => <article key={item.label}><strong>{item.value}</strong><p>{item.label}</p></article>)}</div></section>;
        if (block.type === "testimonial") return <section className="showcase-section showcase-quote" key={key}><Heading block={block} /><blockquote>“{block.quote}”</blockquote><p>{block.person}{block.role ? ` — ${block.role}` : ""}</p></section>;
        if (block.type === "pricing") {
          if (showcase.type === "concept") return null;
          return <section className="showcase-section showcase-pricing" key={key}><Heading block={block} /><div className="showcase-pricing__card"><p>{block.label}</p><strong>{block.amount}</strong>{block.items && <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>}{block.note && <small>{block.note}</small>}</div></section>;
        }
        if (block.type === "acceptance") return <section className="showcase-section showcase-acceptance" key={key}><Heading block={block} /><button type="button" disabled>{block.label ?? "Voorstel accepteren"}</button>{block.note && <p>{block.note}</p>}</section>;
        if (block.type === "cta") return <section className="showcase-cta" key={key}><p className="showcase-eyebrow">{block.eyebrow ?? `${showcase.client} × MEDIADUSTRY`}</p><h2>{block.title}</h2>{block.body && <p>{block.body}</p>}{showcase.type === "concept" ? <div className="showcase-cta__actions"><Link className="showcase-cta__contact" href={block.href}>Neem contact op <span>↗</span></Link></div> : <Link href={block.href}>{block.label} <span>↗</span></Link>}</section>;
        return null;
      })}
    </>
  );
}
