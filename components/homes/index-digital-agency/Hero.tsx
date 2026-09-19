"use client";
import Link from "next/link";
import Image from "next/image";
import CommonLoadAnimation, {
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";
import CommonHero3DImages, {
  CommonHero3DCover,
  CommonHero3DImage,
  CommonHero3DImagesTrack,
  CommonHero3DIntroText,
  CommonHero3DOutroText,
} from "@/components/animations/CommonHero3DImages";
import KineticGrid from "@/components/ui/KineticGrid";
export default function Hero() {
  return (
    <CommonLoadAnimation>
      <>
        <div className="mxd-section mxd-hero-section no-padding loading-wrap">
          <CommonHero3DImages className="mxd-hero-02">
            {/* background group */}
            <div className="mxd-hero-02__background">
              <KineticGrid className="mxd-hero-02__kinetic" />
              <div className="mxd-hero-02__cover" />
            </div>
            {/* scroll images */}
            <CommonHero3DImagesTrack className="mxd-hero-02__images">
              <CommonHero3DImage
                as={Link}
                index={0}
                className="hero-02__img"
                href={`/contact`}
              >
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-01.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={1} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-02.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={2} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-03.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={3} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-04.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={4} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-05.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={5} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-06.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={6} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-07.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={7} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-08.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={8} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-09.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={9} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-10.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={10} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-11.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={11} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-12.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={12} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-01.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={13} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-02.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={14} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-03.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={15} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-04.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={16} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-05.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={17} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-06.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={18} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-07.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={19} className="hero-02__img">
                <Image
                  alt="MEDIADUSTRY creatief werk"
                  src="/img/cta/mediadustry-services/service-08.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
            </CommonHero3DImagesTrack>
            {/* bottom group */}
            <div className="mxd-hero-02__bottom">
              <div className="mxd-hero-02__dataline">
                <div className="mxd-hero-02__socials mxd-grid-item">
                  <ul className="mxd-socials-line">
                    <li>
                      <CommonLoadItem index={0}>
                        <span
                          className="mxd-socials-line__link permanent loading-item"
                        >
                          <TextScramble className="mxd-scramble">
                            AI strategy
                          </TextScramble>
                        </span>
                      </CommonLoadItem>
                    </li>
                    <li>
                      <CommonLoadItem index={1}>
                        <span
                          className="mxd-socials-line__link permanent loading-item"
                        >
                          <TextScramble className="mxd-scramble">
                            Branding
                          </TextScramble>
                        </span>
                      </CommonLoadItem>
                    </li>
                    <li>
                      <CommonLoadItem index={2}>
                        <span
                          className="mxd-socials-line__link permanent loading-item"
                        >
                          <TextScramble className="mxd-scramble">
                            Webdesign
                          </TextScramble>
                        </span>
                      </CommonLoadItem>
                    </li>
                    <li>
                      <CommonLoadItem index={3}>
                        <span
                          className="mxd-socials-line__link permanent loading-item"
                        >
                          <TextScramble className="mxd-scramble">
                            Development
                          </TextScramble>
                        </span>
                      </CommonLoadItem>
                    </li>
                  </ul>
                </div>
                  <div className="mxd-hero-02__controls mxd-grid-item">
                    <SmoothAnchorLink
                      className="btn btn-line-icon btn-line-permanent slide-down"
                      targetId="about"
                    >
                      <TextScramble className="btn-caption mxd-scramble">
                        Ontdek MEDIADUSTRY
                      </TextScramble>
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 18 18"
                        >
                          <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z" />
                        </svg>
                      </i>
                    </SmoothAnchorLink>
                  </div>
              </div>
            </div>
            {/* cover image */}
            <CommonHero3DCover className="mxd-hero-02__cover-img">
              <Image
                alt="MEDIADUSTRY creatief werk"
                src="/img/hero/hero-03_cover.webp"
                width={1920}
                height={1200}
                priority
              />
            </CommonHero3DCover>
            {/* headlines */}
            <div className="mxd-hero-02__intro">
              <CommonHero3DIntroText>
                <h1 className="medium permanent">
                  <span>Strategie, AI</span>
                  <span>&amp; Digital impact.</span>
                </h1>
              </CommonHero3DIntroText>
            </div>
            <div className="mxd-hero-02__outro">
              <CommonHero3DOutroText>
                <p>Klaar om jouw volgende stap te zetten?</p>
              </CommonHero3DOutroText>
            </div>
          </CommonHero3DImages>
        </div>
      </>
    </CommonLoadAnimation>
  );
}
