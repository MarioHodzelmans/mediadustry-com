"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HomeContent = dynamic(() => import("./HomeContent"), { ssr: false });

export default function DeferredHomeContent() {
  const markerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.01) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.01, rootMargin: "0px 0px -1px 0px" });
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return <div ref={markerRef} style={{ minHeight: 1 }}>{visible ? <HomeContent /> : null}</div>;
}
