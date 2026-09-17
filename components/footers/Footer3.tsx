import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated, CommonScrollAnimatedLink } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import FooterBackToTop from "@/components/footers/FooterBackToTop";

export default function Footer3({ name = "MEDIADUSTRY" }: { name?: string }) {
  return (
    <BlurSection as="footer" className="mxd-footer">
      <div className="mxd-container grid-l-container">
        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks mxd-grid-item">
            <div className="footer-blocks__nav-v01">
              <ul className="footer-nav-v01">
                <li className="footer-nav-v01__item"><CommonScrollAnimatedLink className="anim-uni-slide-down" href="/" animation="slideDownLine"><TextScramble className="mxd-scramble mxd-slide-down">Home</TextScramble></CommonScrollAnimatedLink></li>
                <li className="footer-nav-v01__item"><CommonScrollAnimatedLink className="anim-uni-slide-down" href="/contact" animation="slideDownLine"><TextScramble className="mxd-scramble mxd-slide-down">Contact</TextScramble></CommonScrollAnimatedLink></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks">
            <div className="footer-blocks__column mxd-grid-item justify-start">
              <div className="footer-blocks__data justify-start">
                <p className="footer-data"><CommonScrollAnimated className="anim-uni-slide-down" href="mailto:info@mediadustry.com" as="a" animation="slideDownLine"><TextScramble className="mxd-scramble">info@mediadustry.com</TextScramble></CommonScrollAnimated></p>
                <CommonScrollAnimated className="footer-data anim-uni-slide-down" as="p" animation="slideDownLine"><span>Tenelenweg 11, 6367 VR Voerendaal</span></CommonScrollAnimated>
              </div>
            </div>
            <div className="footer-blocks__column mxd-grid-item justify-end">
              <div className="footer-blocks__data justify-end">
                <CommonScrollAnimated className="footer-data anim-uni-slide-down" as="p" animation="slideDownLine"><span>© {new Date().getFullYear()} MEDIADUSTRY</span></CommonScrollAnimated>
                <CommonScrollAnimated className="footer-data anim-uni-slide-down" as="p" animation="slideDownLine"><span>KVK 54271932 · BTW NL062176468B02</span></CommonScrollAnimated>
                <CommonScrollAnimated className="footer-data anim-uni-slide-down" as="p" animation="slideDownLine"><span>Alle rechten voorbehouden</span></CommonScrollAnimated>
              </div>
            </div>
          </div>
        </div>

        <div className="mxd-block"><div className="mxd-footer__fw-mark mxd-grid-item"><div className="fw-mark__wrap"><div className="fw-mark__content"><CommonAnimatedText as="span" className="anim-uni-chars" animation="animChars">{name}</CommonAnimatedText></div></div></div></div>

        <div className="mxd-block"><div className="mxd-footer__footer-blocks bottom-blocks"><div className="footer-blocks__column mxd-grid-item justify-start"><CommonScrollAnimated className="footer-data anim-uni-fade-in" as="p" animation="fadeIn"><span>Strategie · Design · Development</span></CommonScrollAnimated></div><div className="footer-blocks__column mxd-grid-item justify-end"><CommonScrollAnimated className="footer-blocks__controls anim-uni-fade-in" as="div" animation="fadeIn"><FooterBackToTop /></CommonScrollAnimated></div></div></div>
      </div>
    </BlurSection>
  );
}
