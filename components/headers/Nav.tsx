"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { MutableRefObject } from "react";
import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import TextScramble from "@/components/animations/TextScramble";
import { useMxdMenuGsap, useMxdMenuGsapRefs } from "@/hooks/useMxdMenuGsap";

function makeSlotters<T>(arr: MutableRefObject<(T | null)[]>, len: number) {
  return Array.from({ length: len }, (_, index) => (element: T | null) => {
    arr.current[index] = element;
  });
}

type NavProps = {
  navNode: HTMLElement | null;
  toggleNode: HTMLElement | null;
  hamburgerNode: HTMLElement | null;
  setNavNode: (el: HTMLElement | null) => void;
  registerMenuReset: (fn: (() => void) | null) => void;
};

export default function Nav({ navNode, toggleNode, hamburgerNode, setNavNode, registerMenuReset }: NavProps) {
  const g = useMxdMenuGsapRefs();
  const headerSlots = useMemo(() => makeSlotters(g.headerSplitTargets, 3), [g]);
  const mainSlots = useMemo(() => makeSlotters(g.mainMenuLinkSpans, 4), [g]);
  const contactSlots = useMemo(() => makeSlotters(g.contactAnchors, 3), [g]);
  const contactRevealSlots = useMemo(() => makeSlotters(g.contactRevealTargets, 3), [g]);
  const footerSlots = useMemo(() => makeSlotters(g.footerSplitTargets, 2), [g]);
  const dividerSlots = useMemo(() => makeSlotters(g.dividers, 3), [g]);
  const liSlots = useMemo(() => makeSlotters(g.menuItemLis, 2), [g]);

  useMxdMenuGsap(navNode, toggleNode, hamburgerNode, registerMenuReset, g);

  return (
    <nav className="mxd-menu mxd-menu--gsap" ref={setNavNode}>
      <div ref={g.backdrop} className="mxd-menu__backdrop" />
      <div ref={g.overlay} className="mxd-menu__overlay">
        <div ref={g.content} className="mxd-menu__content" data-lenis-prevent="">
          <div className="mxd-menu__logo">
            <Link href="/" className="menu-logo">
              <svg className="menu-logo__image" viewBox="0 0 42.4 36" aria-hidden>
                <path d="M25.8,13.8h2.8v5.5h-2.8v-5.5ZM13.8,16.6v2.8h2.8v-5.5h-2.8v2.8ZM32.2,0v2.8h-2.8V0h2.8ZM26.7,5.5h2.8v-2.8h-2.8v2.8ZM21.2,5.5h-5.5v2.8h11.1v-2.8h-5.5ZM12.8,2.8v2.8h2.8v-2.8h-2.8ZM10.1,0v2.8h2.8V0h-2.8ZM7.3,5.5v5.5h2.8V2.8h-2.8v2.8ZM4.5,13.8v2.8H0v2.8h2.8v2.8H0v2.8h2.8v11.1h2.8v-8.3h5.5v-2.8h-5.5v-8.3h1.9v-5.5h-2.9v2.8ZM35,5.5v-2.8h-2.8v8.3h2.8v-5.5ZM42.4,19.4v-2.8h-4.7v-5.5h-2.8v5.5h1.9v8.3h-5.5v2.8h5.5v8.3h2.8v-11.1h2.8v-2.8h-2.8v-2.8h2.8Z" />
              </svg>
              <div className="menu-logo__text"><span ref={headerSlots[0]}>MEDIA</span><span ref={headerSlots[1]}>DUSTRY</span></div>
            </Link>
          </div>
          <div className="mxd-menu__media">
            <div ref={g.mediaWrapper} className="menu-media__wrapper">
              <AutoplayLoopVideo poster="video/900x1280_menu.webp" sources={[{ type: "video/mp4", src: "video/900x1280_menu.mp4" }, { type: "video/webm", src: "video/900x1280_menu.webm" }]} />
            </div>
          </div>
          <div className="mxd-menu__navigation">
            <div className="mxd-menu__inner">
              <div className="mxd-menu__shadow shadow-top" />
              <div className="mxd-menu__caption"><p ref={headerSlots[2]}>Strategie, design en development<br />voor digitale vooruitgang.</p></div>
              <div className="mxd-menu__left"><div className="main-menu"><div className="main-menu__content">
                <ul id="main-menu" className="main-menu__accordion">
                  <li ref={liSlots[0]} className="main-menu__item">
                    <div ref={dividerSlots[0]} className="main-menu__divider divider-top" />
                    <Link className="main-menu__link" href="/"><span ref={mainSlots[0]} className="main-menu__number">/ 01</span><span ref={mainSlots[1]} className="main-menu__caption">Home</span></Link>
                    <div ref={dividerSlots[1]} className="main-menu__divider divider-bottom" />
                  </li>
                  <li ref={liSlots[1]} className="main-menu__item">
                    <Link className="main-menu__link" href="/contact"><span ref={mainSlots[2]} className="main-menu__number">/ 02</span><span ref={mainSlots[3]} className="main-menu__caption">Contact</span></Link>
                    <div ref={dividerSlots[2]} className="main-menu__divider divider-bottom" />
                  </li>
                </ul>
              </div></div></div>
              <div className="mxd-menu__right"><div className="menu-contact">
                <div className="menu-contact__item"><ul className="menu-contact__list">
                  <li><a ref={contactSlots[0]} className="tag tag-m" href="mailto:info@mediadustry.com"><TextScramble ref={contactRevealSlots[0]} className="mxd-scramble">info@mediadustry.com</TextScramble></a></li>
                  <li><a ref={contactSlots[1]} className="tag tag-m" href="tel:+31624383998"><TextScramble ref={contactRevealSlots[1]} className="mxd-scramble">+31 (0)6 243 83 998</TextScramble></a></li>
                </ul></div>
                <div className="menu-contact__item"><ul className="menu-contact__list"><li><a ref={contactSlots[2]} className="tag tag-m" href="https://maps.google.com/?q=Tenelenweg+11+Voerendaal" target="_blank"><span ref={contactRevealSlots[2]}>Tenelenweg 11<br />6367 VR Voerendaal<br />The Netherlands</span></a></li></ul></div>
              </div></div>
              <div className="mxd-menu__footer"><p ref={footerSlots[0]}>© {new Date().getFullYear()} MEDIADUSTRY</p><p ref={footerSlots[1]}>KVK 54271932 · BTW NL062176468B02</p></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
