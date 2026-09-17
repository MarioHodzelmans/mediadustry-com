import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function SectionTitle() {
  return (
    <>
      <BlurSection className="mxd-section bg-color-base padding-top-title padding-bottom-tag-m">
        <div className="mxd-container grid-l-container">
          {/* Block - Section Title & Text Block Start */}
          <div className="mxd-block">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item">
                  {/* section title */}
                  <div className="mxd-section-title">
                    <div className="mxd-section-title__title pre-caption">
                      <CommonAnimatedText
                        as="h2"
                        className="mxd-split-lines"
                        animation="splitLines"
                      >
                        MEDIADUSTRY in Voerendaal
                      </CommonAnimatedText>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6 mxd-grid-item">
                  {/* paragraph */}
                  <div className="mxd-section-title__paragraph">
                    <CommonAnimatedText
                      as="p"
                      className="t-bold t-large mxd-split-lines"
                      animation="splitLines"
                    >
                      Persoonlijk contact, korte lijnen en één aanspreekpunt
                      voor strategie, ontwerp en realisatie.
                      <span>Van eerste idee tot een digitaal product dat werkt.</span>
                    </CommonAnimatedText>
                  </div>
                  {/* contact data */}
                  <div className="mxd-section-title__datalist">
                    <div className="container-fluid p-0">
                      <div className="row g-0">
                        {/* contact data item */}
                        <div className="col-12 col-md-6 col-xl-5 datalist__item">
                          <div className="datalist__title">
                            <CommonScrollAnimated
                              className="t-bold t-large anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Bezoek &amp; contact
                            </CommonScrollAnimated>
                          </div>
                          <ul>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <a
                                className="tag tag-s-mobile"
                                href="https://maps.google.com/?q=Tenelenweg+11+Voerendaal"
                                target="_blank"
                              >
                                Tenelenweg 11,
                                <br />
                                6367 VR Voerendaal
                                <br />
                                The Netherlands
                              </a>
                            </CommonScrollAnimated>
                          </ul>
                          <ul>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <a
                                href="mailto:info@mediadustry.com?subject=Message%20from%20your%20site"
                                className="tag tag-s-mobile"
                              >
                                <TextScramble className="mxd-scramble">
                                  info@mediadustry.com
                                </TextScramble>
                              </a>
                            </CommonScrollAnimated>
                          </ul>
                        </div>
                        {/* contact data item */}
                        <div className="col-12 col-md-6 col-xl-5 datalist__item">
                          <div className="datalist__title">
                            <CommonScrollAnimated
                              className="t-bold t-large t-caption anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Bedrijfsgegevens
                            </CommonScrollAnimated>
                          </div>
                          <ul>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <a
                                className="tag tag-s-mobile"
                                href="https://www.mediadustry.com"
                              >
                                MEDIADUSTRY
                                <br />
                                KVK 54271932
                                <br />
                                BTW NL062176468B02
                              </a>
                            </CommonScrollAnimated>
                          </ul>
                          <ul>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <a
                                href="https://www.mediadustry.com"
                                className="tag tag-s-mobile"
                              >
                                <TextScramble className="mxd-scramble">
                                  www.mediadustry.com
                                </TextScramble>
                              </a>
                            </CommonScrollAnimated>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <a
                                href="mailto:info@mediadustry.com?subject=Message%20from%20your%20site"
                                className="tag tag-s-mobile"
                              >
                                <TextScramble className="mxd-scramble">
                                  info@mediadustry.com
                                </TextScramble>
                              </a>
                            </CommonScrollAnimated>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title & Text Block End */}
        </div>
      </BlurSection>
    </>
  );
}
