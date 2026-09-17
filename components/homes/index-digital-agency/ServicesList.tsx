"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
export default function ServicesList() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-subtitle-mobile padding-bottom-default"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v01 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title">
                        <CommonAnimatedText
                          as="h2"
                          className="reveal-type"
                          animation="revealType"
                        >
                          Creativiteit die digitaal werkt
                        </CommonAnimatedText>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 mxd-grid-item">
                      <div className="mxd-section-title__data top-controls">
                        <CommonScrollAnimated
                          className="mxd-section-title__controls pre-title justify-end anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href={`/contact`}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              Start een project
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v01 End */}
            {/* Block - Services List Start */}
            <div className="mxd-block">
              <div className="mxd-services-list no-marquee">
                {/* services item */}
                <Link
                  className="mxd-services-list__item active-cursor-image-tr"
                  data-cursor-image="/img/services/500x500_s01.webp"
                  href={`/contact`}
                >
                  <div className="mxd-services-list__divider top" />
                  <div className="container-fluid px-0 mxd-services-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-1 mxd-grid-padding">
                        <div className="mxd-services-list__number">
                          <span className="meta-tag">[01]</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-services-list__title">
                          <h3>Branding & visual design</h3>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-services-list__descr">
                          <p className="t-medium">
                            Een herkenbare visuele identiteit die jouw verhaal
                            helder maakt en bij de juiste mensen blijft hangen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-services-list__divider bottom" />
                </Link>
                {/* services item */}
                <Link
                  className="mxd-services-list__item active-cursor-image-tr"
                  data-cursor-image="/img/services/500x500_s02.webp"
                  href={`/contact`}
                >
                  <div className="mxd-services-list__divider top" />
                  <div className="container-fluid px-0 mxd-services-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-1 mxd-grid-padding">
                        <div className="mxd-services-list__number">
                          <span className="meta-tag">[02]</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-services-list__title">
                          <h3>Webdesign & development</h3>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-services-list__descr">
                          <p className="t-medium">
                            Snelle, toegankelijke websites en digitale
                            ervaringen die er sterk uitzien en prettig werken.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-services-list__divider bottom" />
                </Link>
                {/* services item */}
                <Link
                  className="mxd-services-list__item active-cursor-image-tr"
                  data-cursor-image="/img/services/500x500_s03.webp"
                  href={`/contact`}
                >
                  <div className="mxd-services-list__divider top" />
                  <div className="container-fluid px-0 mxd-services-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-1 mxd-grid-padding">
                        <div className="mxd-services-list__number">
                          <span className="meta-tag">[03]</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-services-list__title">
                          <h3>Digitale strategie</h3>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-services-list__descr">
                          <p className="t-medium">
                            Van positionering en concept tot een heldere route
                            voor duurzame digitale groei.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-services-list__divider bottom" />
                </Link>
                {/* services item */}
                <Link
                  className="mxd-services-list__item active-cursor-image-tr"
                  data-cursor-image="/img/services/500x500_s04.webp"
                  href={`/contact`}
                >
                  <div className="mxd-services-list__divider top" />
                  <div className="container-fluid px-0 mxd-services-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-1 mxd-grid-padding">
                        <div className="mxd-services-list__number">
                          <span className="meta-tag">[04]</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-services-list__title">
                          <h3>E-commerce & Shopify</h3>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-services-list__descr">
                          <p className="t-medium">
                            Headless en Shopify-oplossingen die merkbeleving,
                            snelheid en een soepel aankoopproces combineren.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-services-list__divider bottom" />
                </Link>
                {/* services item */}
                <Link
                  className="mxd-services-list__item active-cursor-image-tr"
                  data-cursor-image="/img/services/500x500_s05.webp"
                  href={`/contact`}
                >
                  <div className="mxd-services-list__divider top" />
                  <div className="container-fluid px-0 mxd-services-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-1 mxd-grid-padding">
                        <div className="mxd-services-list__number">
                          <span className="meta-tag">[05]</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-services-list__title">
                          <h3>Content & doorontwikkeling</h3>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-services-list__descr">
                          <p className="t-medium">
                            Content, optimalisatie en technische ondersteuning
                            om jouw digitale platform actueel en sterk te houden.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-services-list__divider bottom" />
                </Link>
              </div>
            </div>
            {/* Block - Services List End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
