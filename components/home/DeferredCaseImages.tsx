"use client";

import { useEffect } from "react";

export default function DeferredCaseImages() {
  useEffect(() => {
    const images = document.querySelectorAll<HTMLImageElement>(
      "img[data-deferred-case-image]",
    );

    const activate = (image: HTMLImageElement) => {
      const src = image.dataset.deferredSrc;
      if (!src) return;
      image.parentElement
        ?.querySelectorAll<HTMLSourceElement>("source[data-deferred-srcset]")
        .forEach((source) => {
          source.srcset = source.dataset.deferredSrcset ?? "";
          source.removeAttribute("data-deferred-srcset");
        });
      image.loading = "eager";
      image.src = src;
      image.removeAttribute("data-deferred-src");
      image.removeAttribute("data-deferred-case-image");
    };

    if (typeof IntersectionObserver === "undefined") {
      images.forEach(activate);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          activate(entry.target as HTMLImageElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "400px 0px" },
    );
    // Observe the image box: display:contents pictures have no own geometry.
    images.forEach((image) => observer.observe(image));
    return () => observer.disconnect();
  }, []);

  return null;
}
