import CreativeStudioCopyright from './subComponents/CreativeStudioCopyright';
import Image from 'next/image';
import Link from 'next/link';

const CreativeStudioFooter = ({ buttonCls = "" }) => {
    return (
        <footer className={`creative-footer-style ${buttonCls} p-relative z-index-1`} style={{ backgroundColor: "#F6F6F9" }}>
            <div className="creative-footer-text d-none d-lg-block">
                <p>Mediadustry — terug naar boven 👆</p>
            </div>

            {/* -- footer area start -- */}
            <div className="creative-footer-area pt-160 pb-35">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-4 col-lg-4">
                            <div className="tp-footer-widget tp-footer-col-1 pb-40 tp_fade_anim" data-delay=".3">
                                <Image className="mediadustry-footer-mark" src="/assets/img/brand/mediadustry-icon.svg" alt="MEDIADUSTRY beeldmerk" width={118} height={117} />
                                <h4 className="tp-footer-widget-title">Digitale groei <br /> zonder ruis.</h4>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-4 col-md-6">
                            <div className="tp-footer-widget tp-footer-col-2 pb-40 tp_fade_anim" data-delay=".5">
                                <h4 className="tp-footer-widget-title-sm pre mb-25">Snel naar</h4>
                                <div className="tp-footer-widget-menu">
                                    <ul>
                                        <li><Link href="/">Home</Link></li>{" "}
                                        <li><Link href="https://shop.mediadustry.com">Shop</Link></li>{" "}
                                        <li><Link href="/contact-us-light">Contact</Link></li>
                                        <li><Link href="/imprint">Imprint</Link></li>{" "}
                                        <li><Link href="/disclaimer">Disclaimer</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="tp-footer-widget tp-footer-col-3 pb-40 mb-30 tp_fade_anim" data-delay=".7" data-on-scroll="3">
                                <h4 className="tp-footer-widget-title-sm pre mb-20">Contact</h4>
                                <div className="tp-footer-widget-info">
                                    <Link href="mailto:info@mediadustry.com">info@mediadustry.com</Link>
                                </div>
                                <div className="tp-footer-widget-info">
                                    <Link href="https://mediadustry.com">mediadustry.com</Link>
                                </div>
                                <div className="tp-footer-widget-info">
                                    <Link href="tel:+31624383998">+31 6 24 38 39 98</Link>
                                </div>
                                <div className="tp-footer-widget-info">
                                    <span>Tenelenweg 11<br />6367 VR Voerendaal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreativeStudioCopyright />
            {/* -- footer area end -- */}
        </footer>
    );
};

export default CreativeStudioFooter;
