"use client"
import shape from '../../../public/assets/img/title-shape/title-shape-1.png';
import shapeTwo from '../../../public/assets/img/home-07/shape/shape-4.png';
import PricingPlanCard from './subComponents/PricingPlanCard';
import useTabIndicator from '@/hooks/useTabIndicator';
import pricePlans from '@/data/priceData';
import Image from 'next/image';
import Link from 'next/link';

const UniqueAIImagePrice = () => {
    const lineMarkerRef = useTabIndicator();
    // Define the tab values explicitly for each section
    const desktopPlans = pricePlans.slice(0,6).filter(plan => plan.tab === 'desktop');
    const mobilePlans = pricePlans.slice(0,6).filter(plan => plan.tab === 'mobile');

    return (
        <div className="ai-price-area p-relative pt-120 pb-130">
            <div className="ai-price-shape-2">
                <Image src={shapeTwo} alt="shape" />
            </div>
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="ai-price-title-box text-center mb-40">
                            <div className="tp-section-subtitle-gradient mb-20 tp_fade_anim" data-delay=".3">
                                <div><Image src={shape} alt="shape" /></div>
                                flexable & affordable
                            </div>
                            <h4 className="tp-section-title fs-54 mb-10 tp_fade_anim" data-delay=".5">Exclusive price plans</h4>
                            <div className="tp_fade_anim" data-delay=".7">
                                <p>Choose the plan that works for you.</p>
                            </div>
                        </div>
                        <div className="ai-price-tab-wrap text-center mb-60 tp_fade_anim" data-delay=".7">
                            <div className="ai-price-tab tp-marker-tab d-inline-flex justify-content-center p-relative">
                                <ul className="nav nav-tab" id="myTab" role="tablist">
                                    <li className="nav-items active" role="presentation">
                                        <button className="nav-links active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Desktop</button>
                                    </li>
                                    <li className="nav-items" role="presentation">
                                        <button className="nav-links" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Mobile</button>
                                    </li>
                                </ul>
                                <span id="lineMarker" ref={lineMarkerRef}></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
                        <div className="row align-items-end">
                            {desktopPlans.map(plan => (
                                <PricingPlanCard plan={plan} key={plan.id} />
                            ))}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="row align-items-end">
                            {mobilePlans.map(plan => (
                                <PricingPlanCard plan={plan} key={plan.id} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="ai-price-bottom-text text-center tp_fade_anim" data-delay=".3" data-fade-from="top" data-ease="bounce">
                            <span>Still have a question? <Link href="#">Browse documentation</Link> or <Link href="#">Submit a ticket.</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniqueAIImagePrice;