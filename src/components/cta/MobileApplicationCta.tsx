import playStore from '../../../public/assets/img/home-10/cta/play-store.svg';
import appStore from '../../../public/assets/img/home-10/cta/app-store.svg';
import ctaPhn from '../../../public/assets/img/home-10/cta/cta-phn-1.png';
import ctaPhn2 from '../../../public/assets/img/home-10/cta/cta-phn-2.png';
import Image from 'next/image';

const MobileApplicationCta = () => {
    return (
        <div className="app-cta-area z-index-1">
            <div className="container container-1430">
                <div className="app-cta-wrap">
                    <div className="row align-items-end">
                        <div className="col-lg-6">
                            <div className="app-cta-wrapper pt-90 pb-90">
                                <div className="app-cta-heading mb-30">
                                    <h3 className="tp-section-title-phudu fs-70 mb-20 tp_fade_anim" data-delay=".3">
                                        Ready To <br /> Download
                                    </h3>
                                    <div className="tp_fade_anim" data-delay=".5">
                                        <p>Your ultimate travel partner. Carries the information <br /> you need while travelling.</p>
                                    </div>
                                </div>
                                <div className="app-cta-store-box d-flex align-items-center tp_fade_anim" data-delay=".3" data-fade-from="top" data-ease="bounce">
                                    <div className="app-cta-store mr-15">
                                        <div className="app-cta-store-icon">
                                            <span><Image src={playStore} alt="play-store" /></span>
                                        </div>
                                        <div className="app-cta-store-content">
                                            <p>Download on the</p>
                                            <span>Play Store</span>
                                        </div>
                                    </div>
                                    <div className="app-cta-store">
                                        <div className="app-cta-store-icon">
                                            <span><Image src={appStore} alt="app-store" /></span>
                                        </div>
                                        <div className="app-cta-store-content">
                                            <p>Download on the</p>
                                            <span>App Store</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="app-cta-thumb-wrap">
                                <div className="app-cta-thumb p-relative">
                                    <div className="tp_fade_anim z-index-1" data-fade-from="left" data-delay=".3">
                                        <Image className="app-cta-thumb-1" src={ctaPhn} alt="cta-phone" />
                                    </div>
                                    <div className="tp_fade_anim" data-fade-from="right" data-delay=".1">
                                        <Image className="app-cta-thumb-2" src={ctaPhn2} alt="cta-thumb" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileApplicationCta;