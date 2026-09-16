import { ArrowSvg, ButtonBlurFilter, RightArrowIcon, LeftArrowIcon } from '@/svg';
import TestimonialItemThree from './subComponents/TestimonialItemThree';
import Link from 'next/link';

const CreativeStudioTestimonial = () => {
    return (
        <div className="creative-testimonial-area pt-120 pb-120 fix">
            <div className="container container-1580">
                <div className="row align-items-center">
                    <div className="col-xl-3 col-lg-4">
                        <div className="creative-testimonial-title-box mb-25">
                            <span className="tp-section-subtitle mb-20 fs-17 pre-circle tp_fade_anim" data-delay=".3">Testimonials</span>
                            <h4 className="tp-section-title fs-44 tp_fade_anim" data-delay=".5">What our <br /> happy clients <br /> say about us.</h4>
                        </div>
                        <div className="creative-testimonial-btn mb-55 tp_fade_anim" data-delay=".7" data-fade-from="top" data-ease="bounce">
                            <Link href="/contact" className="tp-btn-black btn-green-light-bg pr-15">
                                <span className="tp-btn-black-filter-blur">
                                    <ButtonBlurFilter filterId="buttonFilter6" />
                                </span>
                                <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter6)' }}>
                                    <span className="tp-btn-black-text">Let’s chat</span>
                                    <span className="tp-btn-black-circle">
                                        <ArrowSvg />
                                    </span>
                                </span>
                            </Link>
                        </div>
                        <div className="creative-testimonial-arrow">
                            <button className="creative-testimonial-prev mr-5">
                                <span><LeftArrowIcon /></span>
                            </button>
                            <button className="creative-testimonial-next">
                                <span><RightArrowIcon /></span>
                            </button>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8">
                        <TestimonialItemThree />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeStudioTestimonial;