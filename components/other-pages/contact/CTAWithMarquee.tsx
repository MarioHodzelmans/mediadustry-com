"use client";

import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { initCtaMarqueeToLeft } from "@/lib/template/ctaMarqueeEffects";
import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function CTAWithMarquee() {
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    return initCtaMarqueeToLeft(marqueeTrackRef.current);
  }, []);
  return (
    <>
      <BlurSection className="mxd-section bg-color-opposite">
        <div className="mxd-container fullwidth-container">
          {/* Block - CTA with Matter.js Objects Start */}
          <div className="mxd-block">
            <div className="mxd-promo transparent">
              <div className="mxd-promo__wrap auto-height">
                {/* content */}
                <div className="mxd-promo__content">
                  <CommonScrollAnimated
                    className="mxd-promo__btngroup anim-uni-in-up"
                    as="div"
                    animation="inUp"
                  >
                    <Link
                      className="btn btn-line btn-line-opposite"
                      href={`/contact`}
                    >
                      <TextScramble className="btn-caption mxd-scramble">
                        Start een project
                      </TextScramble>
                    </Link>
                  </CommonScrollAnimated>
                  <div className="mxd-promo__caption">
                    <Link
                      className="active-cursor-accent"
                      data-cursor-text="Contact Us"
                      href={`/contact`}
                    >
                      <CommonAnimatedText
                        as="h2"
                        className="opposite mxd-split-lines"
                        animation="splitLines"
                      >
                        Vertel ons over jouw project
                      </CommonAnimatedText>
                    </Link>
                  </div>
                </div>
                {/* marquee */}
                <div className="mxd-promo__marquee">
                  {/* Marquee Divider Start */}
                  <div className="marquee marquee-left--gsap">
                    <div
                      className="marquee__toleft marquee__images"
                      ref={marqueeTrackRef}
                    >
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Strategie
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Lichtpad door een digitaal berglandschap"
                            src="/img/cta/mediadustry-services/service-01.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Branding
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Abstract monolithisch merkobject"
                            src="/img/cta/mediadustry-services/service-02.webp"
                            width={1600}
                            height={900}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Development
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Gelaagde digitale interfaces"
                            src="/img/cta/mediadustry-services/service-03.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Webdesign
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Toekomstgericht webdesign in meerdere schermlagen"
                            src="/img/cta/mediadustry-services/service-04.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            E-commerce
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Digitale sneaker in een verlichte portal"
                            src="/img/cta/mediadustry-services/service-05.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Digital design
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Abstract golvend digitaal materiaal"
                            src="/img/cta/mediadustry-services/service-06.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Content
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Explosieve compositie van digitale beeldlagen"
                            src="/img/cta/mediadustry-services/service-07.webp"
                            width={1200}
                            height={900}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Motion
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Bewegende neonlichtlijnen"
                            src="/img/cta/mediadustry-services/service-08.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Campagnes
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Wereldwijd digitaal netwerk"
                            src="/img/cta/mediadustry-services/service-09.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Video
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Projectie van een digitaal landschap"
                            src="/img/cta/mediadustry-services/service-10.webp"
                            width={1200}
                            height={900}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Photography
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Camera voor digitale fotografie en content"
                            src="/img/cta/mediadustry-services/service-11.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            3D Models
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Abstract driedimensionaal digitaal object"
                            src="/img/cta/mediadustry-services/service-12.webp"
                            width={1600}
                            height={900}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Development
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Gelaagde digitale interfaces"
                            src="/img/cta/mediadustry-services/service-03.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Illustrations
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Toekomstgericht webdesign in meerdere schermlagen"
                            src="/img/cta/mediadustry-services/service-04.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium-opposite mxd-scramble">
                            Fashion
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Digitale sneaker in een verlichte portal"
                            src="/img/cta/mediadustry-services/service-05.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Marquee Divider End */}
                </div>
              </div>
            </div>
          </div>
          {/* Block - CTA with Matter.js Objects End */}
        </div>
      </BlurSection>
    </>
  );
}
