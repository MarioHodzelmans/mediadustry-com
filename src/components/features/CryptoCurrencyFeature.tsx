import feature2Bg from '../../../public/assets/img/home-13/feature/feature-2/feature-2-bg.png';
import feature2_1 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-1.png';
import feature2_2 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-2.png';
import feature2_3 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-3.png';
import feature2_4 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-4.png';
import feature2_5 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-5.png';
import feature2_6 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-6.png';
import feature2_7 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-7.png';
import feature2_8 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-8.png';
import feature2_9 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-9.png';
import feature2_10 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-10.png';
import feature2_11 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-11.png';
import feature2_12 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-12.png';
import feature2_13 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-13.png';
import feature2_14 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-14.png';
import feature2_15 from '../../../public/assets/img/home-13/feature/feature-2/feature-2-15.png';
import CryptoFeatureItem from './subComponents/CryptoFeatureItem';
import { ArrowEleven } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

const CryptoCurrencyFeature = () => {
    return (
        <div className="cr-feature-2-area p-relative cr-feature-2-ptb">
            <div className="cr-feature-2-bg">
                <Image style={{ width: "auto", height: "auto" }} src={feature2Bg} alt="feature" />
            </div>
            <div className="container-fluid gx-0">
                <div className="row g-0">
                    <div className="col-xxl-4 col-xl-6 order-2 order-xxl-1">
                        <div className="cr-feature-2-left">
                            <div className="cr-feature-2-box">
                                <div className="row row-cols-xl-5 gx-0">
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_1} />
                                    </div>
                                    <div className="col"></div>
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_2} animationClass="animation-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="cr-feature-2-box">
                                <div className="row row-cols-xl-5 gx-0">
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_3} />
                                    </div>
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_4} animationClass="animation-2" />
                                    </div>
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_5} />
                                    </div>
                                    <div className="col"></div>
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_6} animationClass="animation-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="cr-feature-2-box">
                                <div className="row row-cols-xl-5 gx-0">
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_7} />
                                    </div>
                                    <div className="col"></div>
                                    <div className="col"></div>
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_8} animationClass="animation-2" />
                                    </div>
                                    <div className="col"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 order-xl-12 order-1 order-xxl-2">
                        <div className="cr-feature-2-heading text-center">
                            <div className="tp-section-subtitle-gradient ct mb-20 tp_fade_anim" data-delay=".3">Features</div>
                            <h4 className="tp-section-title-onest tp-text-revel-anim">Supported tokens</h4>
                            <div className="tp_text_anim">
                                <p>Agntix offers a comprehensive selection of digital assets <br />
                                    that meet our rigorous criteria for quality, safety, and regulatory <br />
                                    compliance</p>
                            </div>
                            <div className="cr-feature-2-btn tp_fade_anim" data-delay=".7" data-fade-from="top" data-ease="bounce">
                                <Link href="/service-3-light" className="tp-btn-white-border">Find out more <span>
                                    <ArrowEleven />
                                </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6 order-2 order-xxl-3">
                        <div className="cr-feature-2-right">
                            <div className="cr-feature-2-box">
                                <div className="row row-cols-xl-5 gx-0 justify-content-end">
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_9} animationClass="animation-2" />
                                    </div>
                                    <div className="col">
                                        <div className="cr-feature-2-item"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="cr-feature-2-box">
                                <div className="row row-cols-xl-5 gx-0">
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_10} />
                                    </div>
                                    <div className="col"></div>
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_11} animationClass="animation-2" />
                                    </div>
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_12} />
                                    </div>
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_13} animationClass="animation" />
                                    </div>
                                </div>
                            </div>
                            <div className="cr-feature-2-box">
                                <div className="row row-cols-xl-5 gx-0">
                                    <div className="col"></div>
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_14} />
                                    </div>
                                    <div className="col"></div>
                                    <div className="col">
                                        <CryptoFeatureItem image={feature2_15} animationClass="animation-2" />
                                    </div>
                                    <div className="col">
                                        <div className="cr-feature-2-item"></div>
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

export default CryptoCurrencyFeature;