"use client";

/* eslint-disable react-hooks/refs -- GSAP owns these callback/ref registries outside render. */

import Link from "next/link";
import { useMemo } from "react";
import type { MutableRefObject } from "react";
import TextScramble from "@/components/animations/TextScramble";
import { useMxdMenuGsap, useMxdMenuGsapRefs } from "@/hooks/useMxdMenuGsap";
import MediadustryMark from "@/components/brand/MediadustryMark";

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
              <MediadustryMark className="menu-logo__image" />
              <div className="menu-logo__text"><span ref={headerSlots[0]}>MEDIADUSTRY</span></div>
            </Link>
          </div>
          <div className="mxd-menu__media">
            <div ref={g.mediaWrapper} className="menu-media__wrapper">
              <div
                className="mxd-video-poster"
                style={{ backgroundImage: 'url("/video/900x1280_menu.webp")' }}
                aria-hidden="true"
              />
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
