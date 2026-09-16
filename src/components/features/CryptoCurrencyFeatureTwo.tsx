import feature from '../../../public/assets/img/home-13/feature/feature-3/feature-3-img.png';
import { ArrowEleven } from '@/svg/ArrowIcons';
import Image from 'next/image';
import Link from 'next/link';

const CryptoCurrencyFeatureTwo = () => {
    return (
        <div className="cr-feature-3-area fix cr-feature-3-border">
            <div className="container container-1230">
                <div className="cr-feature-3-border-box">
                    <div className="cr-feature-3-box">
                        <div className="row gx-0">
                            <div className="col-lg-6">
                                <div className="cr-feature-3-heading">
                                    <div className="tp-section-subtitle-gradient ct mb-20 tp_fade_anim" data-delay=".3">Features</div>
                                    <h4 className="tp-section-title-onest tp-text-revel-anim">Robust & secure <br />
                                        exchange platform</h4>
                                    <div className="tp_text_anim">
                                        <p>Whether you’re looking to trade major coins like <br />
                                            Bitcoin and Ethereum or interested in emerging altcoins, <br />
                                            our platform provides all the tools you need.</p>
                                    </div>
                                    <div className="cr-feature-3-btn tp_fade_anim" data-delay=".7" data-fade-from="top" data-ease="bounce">
                                        <Link href="/service-3-light" className="tp-btn-white-border tp-btn-light-bg">Find out more <span>
                                            <ArrowEleven />
                                        </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="cr-feature-3-thumb">
                                    <Image style={{ width: "100%", height: "auto" }} src={feature} alt="feature" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoCurrencyFeatureTwo;