import { ArrowSvg, ButtonBlurFilter } from '@/svg';
import Link from 'next/link';

const CreativeStudioAbout = () => {
    return (
        <div className="creative-about-area pt-120 pb-100">
            <div className="container container-1580">
                <div className="row">
                    <div className="col-xxl-5 col-xl-3">
                        <div className="creative-about-title-box">
                            <span className="tp-section-subtitle fs-17 pre-circle">Wie we zijn</span>
                        </div>
                    </div>
                    <div className="col-xxl-7 col-xl-9">
                        <div className="creative-about-right">
                            <div className="creative-about-text tp_fade_anim">
                                <p>
                                    We maken digitale merken die helder communiceren en overtuigend presteren. Van strategie en webdesign tot development en Shopify: één partner voor duurzame digitale groei.
                                </p>
                            </div>
                            <div className="creative-about-btn-box d-flex align-items-center">
                                <div className="tp_fade_anim" data-fade-from="top" data-delay=".3" data-ease="bounce">
                                    <Link href="/about-us-light" className="tp-btn-black btn-green-light-bg mb-20 pr-15">
                                        <span className="tp-btn-black-filter-blur">
                                            <ButtonBlurFilter />
                                        </span>
                                        <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter1)' }}>
                                            <span className="tp-btn-black-text">Over Mediadustry</span>
                                            <span className="tp-btn-black-circle">
                                                <ArrowSvg />
                                            </span>
                                        </span>
                                    </Link>
                                </div>
                                <div className="tp_fade_anim" data-fade-from="top" data-delay=".5" data-ease="bounce">
                                    <Link href="/contact-us-light" className="tp-btn-black btn-transparent-bg mb-20">
                                        <span className="tp-btn-black-filter-blur">
                                            <ButtonBlurFilter filterId='buttonFilter2' />
                                        </span>
                                        <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter2)' }}>
                                            <span className="tp-btn-black-text">Plan een gesprek</span>
                                            <span className="tp-btn-black-circle">
                                                <ArrowSvg />
                                            </span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeStudioAbout;
