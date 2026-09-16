import FeatureSource from '../../../public/assets/img/home-10/features/app-features-source.png';
import FeatureBudget from '../../../public/assets/img/home-10/features/app-features-budget.png';
import FeatureTrip from '../../../public/assets/img/home-10/features/app-features-trip.png';
import appFeatures from '../../../public/assets/img/home-10/features/app-features-phn.png';
import FeatureBg from '../../../public/assets/img/home-10/features/app-features-bg.png';
import { ArrowEight } from '@/svg/ArrowIcons';
import Image from 'next/image';
import React from 'react';

const MobileApplicationFeatureTwo = () => {
    return (
        <div className="app-feature-2-area app-feature-2-ptb z-index-1 pt-160 pb-140">
            <div className="app-feature-2-bg">
                <Image className="main-bg" src={FeatureBg} alt="feature-bg" />
                <Image className="shape-1 tp_fade_anim" data-fade-from="top" data-delay=".5" data-ease="bounce" src={FeatureSource} alt="source-image" />
                <Image className="shape-2 tp_fade_anim" data-fade-from="top" data-delay=".7" data-ease="bounce" src={FeatureBudget} alt="feature-budget" />
                <Image className="shape-3 tp_fade_anim" data-fade-from="top" data-delay=".9" data-ease="bounce" src={FeatureTrip} alt="feature-trip" />
            </div>
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="app-feature-2-heading text-center z-index-1 mb-80">
                            <span className="tp-section-subtitle border-bg bg-color tp_fade_anim" data-delay=".3">How it Works</span>
                            <h3 className="tp-section-title-phudu fs-70 mb-20 tp_fade_anim" data-delay=".5">what can you <br /> do with it?</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="app-feature-2-content">
                            <span className="tp-section-subtitle border-bg tp_fade_anim" data-fade-from="top" data-delay=".3" data-ease="bounce">Explore your Travel Interests.</span>
                            <div className="app-feature-2-brd"></div>
                            <div className="app-feature-2-content-icon d-flex">
                                <span><ArrowEight /></span>
                                <p>Powerful features to help you manage <br /> money smarter.</p>
                            </div>
                        </div>
                        <div className="app-feature-2-thumb z-index-1">
                            <Image style={{ width: "auto", height: "auto" }} data-speed="1.1" src={appFeatures} alt="app-feature" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileApplicationFeatureTwo;