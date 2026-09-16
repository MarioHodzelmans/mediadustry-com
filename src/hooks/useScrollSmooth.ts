// "use client";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { useGSAP } from "@gsap/react";
// import { useState } from "react";
// import { gsap } from "gsap";

// export default function useScrollSmooth() {
//   const [isScrollSmooth] = useState<boolean>(true);

//   useGSAP(() => {
//     // Register plugins
//     gsap.registerPlugin(ScrollSmoother);

//     const smoothWrapper = document.getElementById("smooth-wrapper");
//     const smoothContent = document.getElementById("smooth-content");

//     if (smoothWrapper && smoothContent && isScrollSmooth) {
//       gsap.config({
//         nullTargetWarn: false,
//       });

//       ScrollSmoother.create({
//         smooth: 2,
//         effects: true,
//         smoothTouch: 0.1,
//         normalizeScroll: false,
//         ignoreMobileResize: true,
//       });
//     }
//   }, [isScrollSmooth]);
// }

"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function useScrollSmooth() {
  useGSAP(() => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoothWrapper = document.getElementById("smooth-wrapper");
    const smoothContent = document.getElementById("smooth-content");

    if (!smoothWrapper || !smoothContent) return;

    const isDesktop = window.innerWidth >= 768;

    if (isDesktop) {
      ScrollSmoother.create({
        wrapper: smoothWrapper,
        content: smoothContent,
        smooth: 2,
        effects: true,
        smoothTouch: 0.3,
        normalizeScroll: true,
        ignoreMobileResize: false,
      });
    } else {
      gsap.config({ nullTargetWarn: false });
    }
    ScrollTrigger.create({
      trigger: ".shape",
      pin: true,
      start: "center center",
      end: "+=300",
      markers: false,
    });
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
}