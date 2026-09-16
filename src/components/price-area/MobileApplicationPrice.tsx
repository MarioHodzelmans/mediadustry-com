"use client"
import googleStore from '../../../public/assets/img/home-10/price/google-store.svg';
import appStore from '../../../public/assets/img/home-10/price/app-store.svg';
import priceBg from '../../../public/assets/img/home-09/price/price-bg.png';
import PricePlanThreeCard from './subComponents/PriceAreaThreeCard';
import useTabIndicator from '@/hooks/useTabIndicator';
import pricePlans from '@/data/priceData';
import Image from 'next/image';

const MobileApplicationPrice = () => {
    const lineMarkerRef = useTabIndicator();
    // Define the tab values explicitly for each section
    const desktopPlans = pricePlans.slice(6, 12).filter(plan => plan.tab === 'desktop');
    const mobilePlans = pricePlans.slice(6, 12).filter(plan => plan.tab === 'mobile');

    return (
        <div className="app-price-area p-relative pt-120 pb-130">
            <div className="app-price-bg-shape">
                <Image src={priceBg} alt="price-bg" />
            </div>
            <div className="container container-1230">
                <div className="row align-items-end">
                    <div className="col-lg-6">
                        <div className="app-price-heading">
                            <span className="tp-section-subtitle border-bg bg-color tp_fade_anim" data-delay=".3">Affordable pricing</span>
                            <h3 className="tp-section-title-phudu fs-70 mb-55 tp_fade_anim" data-delay=".5">Start With <br /> ffordable Price</h3>
                        </div>
                        <div className="app-price-tab-wrap mb-30 tp_fade_anim" data-delay=".7">
                            <div className="ai-price-tab tp-marker-tab d-inline-flex justify-content-center p-relative">
                                <ul className="nav nav-tab" id="myTab" role="tablist">
                                    <li className="nav-items" role="presentation">
                                        <button className="nav-links active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Monthly</button>
                                    </li>
                                    <li className="nav-items" role="presentation">
                                        <button className="nav-links" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Yearly</button>
                                    </li>
                                </ul>
                                <span id="lineMarker" ref={lineMarkerRef} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-flex justify-content-start justify-content-lg-end">
                            <div className="app-price-wrap mb-30">
                                <div className="app-price-store d-flex align-items-center mb-20">
                                    <p><b>250K+</b>review</p>
                                    <p><span><Image src={appStore} alt="app-store" /></span>App
                                        Store</p>
                                    <p><span><Image src={googleStore} alt="google-store" /></span>Play Store</p>
                                </div>
                                <div className="app-price-heading">
                                    <p>Unlock the full potential of Agntix app with our <br />
                                        flexible pricing options.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                        <div className="app-price-box">
                            <div className="row">
                                {desktopPlans.map(plan => (
                                    <PricePlanThreeCard plan={plan} key={plan.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                        <div className="app-price-box">
                            <div className="row">
                                {mobilePlans.map(plan => (
                                    <PricePlanThreeCard plan={plan} key={plan.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileApplicationPrice;