import shape from '../../../public/assets/img/home-12/testimonial/testimonial-shape.png';
import thumb from '../../../public/assets/img/home-12/chose/choose-us-thumb.jpg';
import { ArrowThirteen } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

const StartupAgencyChoose = () => {
    return (
        <div className="st-choose-area p-relative tp-bounce-trigger st-choose-ptb st-choose-bg pb-160">
            <div className="container container-1320">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="st-choose-heading mb-70">
                            <span className="tp-section-subtitle st tp_fade_anim" data-delay=".3">{`// WHY CHOOSE US`}</span>
                            <h3 className="tp-section-title-playfair mb-20 tp_fade_anim" data-delay=".5">WHY SHOULD YOU <br />
                                <span>CHOOOSE US</span>
                            </h3>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="st-choose-btn text-start text-lg-end mt-25 mb-30">
                            <Link className="tp-btn-border-2 st" href="/service-2-light">
                                KNOW MORE{" "}
                                <span>
                                    <ArrowThirteen />
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="st-choose-list mb-30">
                            <ul>
                                <li>+ Web interaction design</li>
                                <li>+ Seamless Integration</li>
                                <li>+ Generation Technology</li>
                                <li>+ Facility Approach</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="st-choose-text-wrap mb-30">
                            <p>Choosing the right marketing agency can make a big <br />
                                difference. With so many options available, it’s essential <br />
                                to find an agency that understands the unique needs <br />
                                of new businesses. This article highlights some of <br />
                                the top startup marketing agencies that can help your <br />
                                business grow and succeed.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-4">
                        <div className="st-choose-shape tp-bounce">
                            <Image src={shape} alt="shape" />
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="st-choose-thumb mt-40 text-start text-lg-end">
                            <Image style={{ width: "100%", height: "auto" }} data-speed=".8" src={thumb} alt="thumb" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupAgencyChoose;