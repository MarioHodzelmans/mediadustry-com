import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";
export default function ParallaxDividerImage() {
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-divider">
            <UkiyoParallax
              className="mxd-divider__image divider-image-9 parallax-img"
              scale={1.12}
              speed={1.5}
              externalRAF={false}
              style={{
                backgroundImage:
                  'url("/img/mediadustry/ai-connected-world.webp")',
              }}
            />
          </div>
        </div>
      </BlurSection>
    </>
  );
}
