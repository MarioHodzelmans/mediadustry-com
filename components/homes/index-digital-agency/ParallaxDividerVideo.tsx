import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";

export default function ParallaxDividerVideo() {
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-divider">
            <div className="mxd-divider__video">
              <UkiyoParallax
                className="video parallax-video"
                scale={1.12}
                speed={1.5}
                externalRAF={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  className="mxd-video-poster"
                  style={{
                    backgroundImage:
                      'url("/img/mediadustry/human-ai-touch.webp")',
                  }}
                  aria-hidden="true"
                />
              </UkiyoParallax>
            </div>
          </div>
        </div>
      </BlurSection>
    </>
  );
}
