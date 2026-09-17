import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";
export default function AboutProcess() {
  return (
    <>
      <BlurSection
        id="about"
        className="mxd-section bg-color-accent padding-top-manifest-m padding-bottom-default padding-bottom-tag-m-desktop"
      >
        <div className="mxd-container grid-l-container">
          {/* Block - Manifest Large Start */}
          <div className="mxd-block">
            <div className="mxd-section-manifest pre-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 mxd-grid-item">
                    <div className="mxd-section-manifest__wrap wrap-text-m">
                      <div className="mxd-section-manifest__text manifest-text-m">
                        <Link data-cursor-text="About us" href={`/about-me`}>
                          <CommonAnimatedText
                            as="span"
                            className="manifest manifest-m manifest-accent mxd-split-lines active-cursor-permanent"
                            animation="splitLines"
                          >
                            Vanuit Voerendaal bouwt MEDIADUSTRY aan
                            sterke merken en doordachte digitale producten.
                            <span>
                              Wij combineren strategie, design en development voor blijvende impact in het
                              digitale landschap.
                            </span>
                          </CommonAnimatedText>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Manifest Large End */}
          {/* Block - Process Points Start */}
          <div className="mxd-block">
            <div className="mxd-process-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* process item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item animate-card-3"
                    as="div"
                    columns={3}
                  >
                    <div className="mxd-process-points__divider top accent" />
                    <div className="mxd-process-points__title">
                      <div className="mxd-process-points__icon accent">
                        <span className="mxd-process-symbol" aria-hidden="true">✦</span>
                      </div>
                      <p className="accent">Strategy</p>
                    </div>
                    <div className="mxd-process-points__descr">
                      <p className="t-medium t-accent">
                        We brengen doelen, doelgroep en kansen scherp in beeld
                        en vertalen die naar een heldere digitale koers.
                      </p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        heldere richting
                      </span>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* process item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item animate-card-3"
                    as="div"
                    columns={3}
                  >
                    <CommonScrollAnimated
                      className="mxd-process-points__divider top accent anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                    <div className="mxd-process-points__title">
                      <div className="mxd-process-points__icon accent">
                        <span className="mxd-process-symbol" aria-hidden="true">◇</span>
                      </div>
                      <p className="accent">Design</p>
                    </div>
                    <div className="mxd-process-points__descr">
                      <p className="t-medium t-accent">
                        We maken een herkenbaar ontwerp waarin inhoud,
                        identiteit en gebruiksgemak perfect samenkomen.
                      </p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        onderscheidend ontwerp
                      </span>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* process item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item animate-card-3"
                    as="div"
                    columns={3}
                  >
                    <CommonScrollAnimated
                      className="mxd-process-points__divider top accent anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                    <div className="mxd-process-points__title">
                      <div className="mxd-process-points__icon accent">
                        <span className="mxd-process-symbol" aria-hidden="true">{`{ }`}</span>
                      </div>
                      <p className="accent">Development</p>
                    </div>
                    <div className="mxd-process-points__descr">
                      <p className="t-medium t-accent">
                        We bouwen snel, schaalbaar en zorgvuldig — klaar voor
                        groei, beheer en continue doorontwikkeling.
                      </p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        solide realisatie
                      </span>
                    </div>
                    <CommonScrollAnimated
                      className="mxd-process-points__divider bottom accent anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                  </CommonCardBatchAnimated>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Process Points End */}
        </div>
      </BlurSection>
    </>
  );
}
