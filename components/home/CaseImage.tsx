import type { CSSProperties } from "react";

type CaseImageProps = {
  src: string;
  alt: string;
  className: string;
  sizes: string;
  eager?: boolean;
  nativeLazy?: boolean;
  inlineMobileSrc?: string;
};

const TRANSPARENT_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";

function escapeAttribute(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

/** Server-rendered pictures; below-fold sources activate near the viewport. */
export default function CaseImage({
  src,
  alt,
  className,
  sizes,
  eager = false,
  nativeLazy = false,
  inlineMobileSrc,
}: CaseImageProps) {
  const stem = src.slice(src.lastIndexOf("/") + 1, -5);
  const widths = stem.endsWith("-mobile")
    ? [128, 256, 390]
    : [384, 720, 1080, 1440];
  const srcSet = widths
    .map((width) => `/img/cases/responsive/${stem}-${width}.avif ${width}w`)
    .join(", ");
  const style: CSSProperties = {
    position: "absolute",
    height: "100%",
    width: "100%",
    inset: 0,
  };
  const deferred = !eager && !nativeLazy;
  const noScriptPicture = deferred
    ? `<style>img[data-deferred-case-image]{display:none!important}</style><picture style="display:contents">${
        inlineMobileSrc
          ? `<source media="(max-width:700px)" type="image/avif" srcset="${escapeAttribute(inlineMobileSrc)}" sizes="${escapeAttribute(sizes)}">`
          : ""
      }<source type="image/avif" srcset="${escapeAttribute(srcSet)}" sizes="${escapeAttribute(sizes)}"><img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}" class="${escapeAttribute(className)}" style="position:absolute;height:100%;width:100%;inset:0" loading="lazy" decoding="async" fetchpriority="low"></picture>`
    : null;

  return (
    <>
      <picture style={{ display: "contents" }}>
        {inlineMobileSrc && (
          <source
            media="(max-width:700px)"
            type="image/avif"
            srcSet={deferred ? undefined : inlineMobileSrc}
            data-deferred-srcset={deferred ? inlineMobileSrc : undefined}
            sizes={sizes}
          />
        )}
        <source
          type="image/avif"
          srcSet={deferred ? undefined : srcSet}
          data-deferred-srcset={deferred ? srcSet : undefined}
          sizes={sizes}
        />
        <img
          src={deferred ? TRANSPARENT_IMAGE : src}
          data-deferred-case-image={deferred ? "" : undefined}
          data-deferred-src={deferred ? src : undefined}
          alt={alt}
          className={className}
          style={style}
          loading={eager ? "eager" : "lazy"}
          decoding={eager ? "sync" : "async"}
          fetchPriority={eager ? "high" : "low"}
        />
      </picture>
      {noScriptPicture && (
        // Keep fallback markup inert on client navigation as well as initial SSR.
        <noscript dangerouslySetInnerHTML={{ __html: noScriptPicture }} />
      )}
    </>
  );
}
